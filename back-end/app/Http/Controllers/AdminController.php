<?php

namespace App\Http\Controllers;

use App\Models\Color;
use App\Models\ColorProduct;
use App\Models\CountVisit;
use App\Models\Customer;
use App\Models\Image;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Phone;
use App\Models\Ram;
use App\Models\RamProduct;
use App\Models\Rate;
use App\Models\Rom;
use App\Models\RomProduct;
use App\Models\User;
use Carbon\Carbon;
use Hamcrest\Arrays\IsArray;
use Hamcrest\Type\IsArray as TypeIsArray;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use stdClass;

use function PHPSTORM_META\map;
use function PHPUnit\Framework\isEmpty;

class AdminController extends Controller
{
    function countVisit(Request $request)
    {
        CountVisit::where("id", 1)->increment("visit_count");
        return response()->json([
            "status" => "success"
        ]);
    }
    function getCountVisit()
    {
        $countVisit = CountVisit::where("id", 1)->value("visit_count");

        return response()->json([
            "countVisit" => $countVisit
        ]);
    }

    function listCustomers()
    {
        $customers = Customer::with("user")->get()->map(function (Customer $customer) {
            $newUser = new \stdClass();
            $totalCost = 0;

            // Đếm tổng số đơn hàng
            $countOrders = Order::where("id_customer", $customer->id_user)->count();

            // Lấy tất cả các đơn hàng và tính tổng số tiền cho từng đơn hàng
            $orders = Order::where("id_customer", $customer->id_user)->get();
            foreach ($orders as $order) {
                // Tính tổng chi phí của các OrderItem trong mỗi đơn hàng
                $totalCost += OrderItem::where("order_id", $order->id)->sum(DB::raw('order_items.price * order_items.quantity'));
            }

            // Gán các thuộc tính cho đối tượng mới
            $newUser->id = $customer->id;
            $newUser->id_user = $customer->id_user;
            $newUser->name = $customer->name;
            $newUser->address = $customer->address;
            $newUser->phone_number = $customer->phone_number;
            $newUser->count_orders = $countOrders;
            $newUser->total_price = $totalCost;
            $newUser->email = $customer->user->email;

            return $newUser;
        });

        return response()->json([
            "customers" => $customers
        ]);
    }
    function countStats()
    {
        $countUsers = User::count();
        $countCustomer = Customer::count();
        $countOrder = Order::count();
        $countProduct = Phone::count();

        $orders = Order::get();
        $revenue = 0;
        foreach ($orders as $order) {
            //count price for each order
            $revenue += OrderItem::where("order_id", $order->id)->sum(DB::raw('order_items.price * order_items.quantity'));
        }
        return response()->json([
            "users" => $countUsers,
            "customers" => $countCustomer,
            "orders" => $countOrder,
            "products" => $countProduct,
            "revenue" => $revenue,
        ]);
    }
    function listProducts()
    {
        $products = Phone::get()->map(function (Phone $phone) {
            $rams = RamProduct::where("id_product", $phone->id)->with("ram")->get()->map(function (RamProduct $ram) {
                return $ram->ram->type_ram;
            });
            $roms = RomProduct::where("id_product", $phone->id)->with("rom")->get()->map(function (RomProduct $rom) {
                return $rom->rom->type_rom;
            });
            $colors = ColorProduct::where("id_product", $phone->id)->with("colors")->get()->map(function (ColorProduct $color) {
                return $color->colors->name_color;
            });
            $imageUrls = Image::where("id_product", $phone->id)->pluck("url_image");
            $numberOfRate = Rate::where("id_product", $phone->id)->count();
            $totalStar = 0;
            $averRate = 0;
            $rates = Rate::where("id_product", $phone->id)->pluck("star");
            foreach ($rates as  $rate) {
                $totalStar = $totalStar + $rate;
            };
            if ($totalStar != 0 && $numberOfRate != 0)
                $averRate = $totalStar / $numberOfRate;





            $newProduct = new \stdClass();
            $newProduct->id = $phone->id;
            $newProduct->rams =  $rams;
            $newProduct->roms =  $roms;
            $newProduct->colors = $colors;
            $newProduct->name = $phone->name;
            $newProduct->price = $phone->price;
            $newProduct->frequency = $phone->frequency;
            $newProduct->tech_screen = $phone->tech_screen;
            $newProduct->pin = $phone->pin;
            $newProduct->os = $phone->os;
            $newProduct->screen = $phone->screen;
            $newProduct->brand = $phone->brand;
            $newProduct->nameChip = $phone->nameChip;
            $newProduct->quantity = $phone->quantity;
            $newProduct->resolution = $phone->resolution;
            $newProduct->image_url = $imageUrls;
            $newProduct->rate = round($averRate, 1);
            return $newProduct;
        });
        $totalProduct = Phone::count();
        $productsApple = Phone::where("brand", "Apple")->count();
        $productsSamsung = Phone::where("brand", "Samsung")->count();
        $productsVivo = Phone::where("brand", "Vivo")->count();
        $productsOppo = Phone::where("brand", "Oppo")->count();
        $productsXiaomi = Phone::where("brand", "Xiaomi")->count();

        return response()->json([
            "products" => $products,
            "productsXiaomi" => $productsXiaomi,
            "productsVivo" => $productsVivo,
            "productsOppo" => $productsOppo,
            "productsApple" => $productsApple,
            "productsSamsung" => $productsSamsung,
            "totalProduct" => $totalProduct
        ]);
    }
    function createProduct(Request $request)
    {
        $product = new Phone();


        $product->name = $request->input("name");
        $product->brand = $request->input("brand");
        $product->price = $request->input("price");
        $product->frequency = $request->input("frequency");
        $product->tech_screen = $request->input("tech_screen");
        $product->pin = $request->input("pin");
        $product->os = $request->input("os");
        $product->screen = $request->input("screen");
        $product->nameChip = $request->input("nameChip");
        $product->quantity = $request->input("quantity");
        $product->resolution = $request->input("resolution");
        $product->save();
        $idProduct = $product->id;
        $rams = $request->input("rams");
        $roms = $request->input("roms");
        $colors = $request->input("colors");
        $ram_product = new RamProduct();
        $image_urls = $request->input("images_url");

        if ($rams !== []) {
            foreach ($rams as $ram) {

                $idRam = Ram::where("type_ram", $ram)->pluck("id")->first();
                $ram_product = new RamProduct();
                $ram_product->id_product = $idProduct;
                $ram_product->id_ram = $idRam;
                $ram_product->save();
            };
        }
        if ($roms !== []) {
            foreach ($roms as $rom) {
                $idRom = Rom::where("type_rom", $rom)->pluck("id")->first();
                $rom_product = new RomProduct();
                $rom_product->id_product = $idProduct;
                $rom_product->id_rom = $idRom;
                $rom_product->save();
            };
        }

        if ($colors !== []) {
            foreach ($colors as $color) {
                $idColor = Color::where("name_color", $color)->pluck("id")->first();
                $color_product = new ColorProduct();
                $color_product->id_product = $idProduct;
                $color_product->id_color = $idColor;
                $color_product->save();
            };
        }
        if ($image_urls !== []) {
            foreach ($image_urls as $image_url) {
                $imageUrl = new Image();
                $imageUrl->id_product = $product->id;
                $imageUrl->url_image = $image_url;
                $imageUrl->save();
            }
        }



        return response()->json([
            "product" => $product,

        ]);
    }
    function deleteProduct(Request $request)
    {
        $deleted = Phone::destroy($request->id);

        return response()->json([
            "status" =>  $deleted,

        ]);
    }
    function updateProduct(Request $request)
    {

        $data = [];
        $rams = $request->rams;
        $id = $request->id;
        if (!empty($request->price)) {
            $data['price'] = $request->price;
        }
        if (!empty($request->name)) {
            $data['name'] = $request->name;
        }
        if (!empty($request->brand)) {
            $data['brand'] = $request->brand;
        }
        if (!empty($request->frequency)) {
            $data['frequency'] = $request->frequency;
        }
        if (!empty($request->tech_screen)) {
            $data['tech_screen'] = $request->tech_screen;
        }
        if (!empty($request->pin)) {
            $data['pin'] = $request->pin;
        }
        if (!empty($request->os)) {
            $data['os'] = $request->os;
        }
        if (!empty($request->screen)) {
            $data['screen'] = $request->screen;
        }
        if (!empty($request->nameChip)) {
            $data['nameChip'] = $request->nameChip;
        }
        if (!empty($request->quantity)) {
            $data['quantity'] = $request->quantity;
        }
        if (!empty($request->resolution)) {
            $data['resolution'] = $request->resolution;
        }
        $updated =  DB::table('phones')
            ->where('id', $request->id)
            ->update($data);
        DB::table('product_ram')->where('id_product', $request->id)->delete();
        DB::table('product_rom')->where('id_product', $request->id)->delete();
        DB::table('product_color')->where('id_product', $request->id)->delete();

        // Thêm RAM
        RamProduct::where('id_product', $request->id)->delete();
        ColorProduct::where('id_product', $request->id)->delete();
        RomProduct::where('id_product', $request->id)->delete();
        Image::where('id_product', $request->id)->delete();
        $updatedRam = $request->rams;
        foreach ($updatedRam as $ram) {
            // Lấy ID của RAM dựa trên type_ram
            $ramRecord = Ram::where("type_ram", $ram)->first();

            if ($ramRecord) {
                // Tạo bản ghi mới trong RamProduct
                $ramProduct = new RamProduct();
                $ramProduct->id_product = $request->id; // Gán ID sản phẩm
                $ramProduct->id_ram = $ramRecord->id; // Gán ID RAM
                $ramProduct->save();
                $updated = 1; // Lưu vào cơ sở dữ liệu
            }
        }
        $updatedRom = $request->roms;
        foreach ($updatedRom as $rom) {
            // Lấy ID của RAM dựa trên type_ram
            $romRecord = Rom::where("type_rom", $rom)->first();

            if ($romRecord) {
                // Tạo bản ghi mới trong RamProduct
                $romProduct = new RomProduct();
                $romProduct->id_product = $request->id; // Gán ID sản phẩm
                $romProduct->id_rom = $romRecord->id; // Gán ID RAM
                $romProduct->save();
                $updated = 1; // Lưu vào cơ sở dữ liệu
            }
        }
        $updatedColor = $request->colors;
        foreach ($updatedColor as $color) {
            // Lấy ID của RAM dựa trên type_ram
            $colorRecord = Color::where("name_color", $color)->first();

            if ($colorRecord) {
                // Tạo bản ghi mới trong RamProduct
                $colorProduct = new ColorProduct();
                $colorProduct->id_product = $request->id; // Gán ID sản phẩm
                $colorProduct->id_color = $colorRecord->id; // Gán ID RAM
                $colorProduct->save();
                $updated = 1; // Lưu vào cơ sở dữ liệu
            }
        };
        $updatedImages = $request->images_url;

        foreach ($updatedImages as $updatedImage) {

            $image = new Image();
            $image->id_product = $request->id;
            $image->url_image = $updatedImage;

            $image->save();
            $updated = 1;
        }





        return response()->json([
            "status" =>  $updated,
        ]);
    }


    // Order
    function listOrders()
    {
        $count_order = Order::count();
        if ($count_order !== 0) {
            $percentPaymentCOD = (Order::where("method_payment", "COD")->count() / $count_order) * 100;
            $percentPaymentHKPay = (Order::where("method_payment", "vnpay")->count() / $count_order) * 100;
        } else {
            $percentPaymentCOD = 0;
            $percentPaymentHKPay = 0;
        }

        $orders = Order::get()->map(function (Order $order) {
            $orderItems = OrderItem::where("order_id", $order->id)->get();

            $totalAmount = 0;
            $orderItems = OrderItem::where("order_id", $order->id)->get();
            foreach ($orderItems as $orderItem) {
                $totalAmount = $totalAmount + ($orderItem->price * $orderItem->quantity);
            }
            $countOrderItem = OrderItem::where("order_id", $order->id)->count();
            $customer = Customer::where("id_user", $order->id_customer)->with("user")->get()->map(function (Customer $customer) {
                $newCustomer = new \stdClass();
                $newCustomer->id_account = $customer->id_user;
                $newCustomer->name = $customer->name;
                $newCustomer->address = $customer->address;
                $newCustomer->phone_number = $customer->phone_number;
                $newCustomer->email = $customer->user->email;
                $newCustomer->password = $customer->user->password;
                $newCustomer->hkPay_code = $customer->user->hkPay_code;



                return $newCustomer;
            });
            $newOrder = new \stdClass();
            $newOrder->order_items = $orderItems;
            $newOrder->id = $order->id;
            $newOrder->id_customer = $order->id_customer;
            $newOrder->info_customer = $customer;
            $newOrder->status = $order->status;
            $newOrder->total_quantity = $countOrderItem;
            $newOrder->total_amount = $totalAmount;
            $newOrder->method_payment = $order->method_payment;


            return $newOrder;
        });
        return response()->json([
            "orders" => $orders,
            "number_orders" => $count_order,
            "percentagePaymentWithCOD" => $percentPaymentCOD,
            "percentagePaymentWithHkPay" => $percentPaymentHKPay,
        ]);
    }
    function updateOrderStatus(Request $request)
    {
        $updatedStatus = Order::where("id", $request->input("id"))->update(["status" => $request->input("status")]);
        return response()->json([
            "status" => $updatedStatus
        ]);
    }


    function getRevenue(Request $request)
    {
        // Lấy ngày hiện tại
        $today = Carbon::now();

        // Lấy tất cả các đơn hàng từ đầu tuần đến hết ngày hiện tại
        $orders = Order::where('created_at', '<=', $today->endOfDay()->toDateTimeString())
            ->where('status', '=', 'finish')
            ->get();

        // Mảng ánh xạ các số ngày trong tuần (0 = Chủ nhật, 6 = Thứ bảy) sang tên các ngày
        $dayNames = [
            0 => 'Chủ nhật',
            1 => 'Thứ 2',
            2 => 'Thứ 3',
            3 => 'Thứ 4',
            4 => 'Thứ 5',
            5 => 'Thứ 6',
            6 => 'Thứ 7',
        ];

        // Mảng chứa doanh thu cho từng ngày
        $daysRevenue = [];

        // Lặp qua các ngày trong tuần
        for ($i = 0; $i < 7; $i++) {
            if ($i > $today->dayOfWeek) {
                // Nếu ngày nằm sau ngày hiện tại, chỉ thêm 'day' mà không có 'revenue'
                $daysRevenue[] = [
                    'day' => $dayNames[$i],
                ];
            } else {
                // Nếu ngày nằm trước hoặc bằng ngày hiện tại, khởi tạo revenue = 0
                $daysRevenue[$i] = [
                    'day' => $dayNames[$i],
                    'revenue' => 0,
                ];
            }
        }

        // Lặp qua các đơn hàng và tính doanh thu cho từng ngày từ Chủ nhật đến ngày hiện tại
        foreach ($orders as $order) {
            // Lấy ngày của đơn hàng (0-6: Chủ nhật - Thứ bảy)
            $orderDayOfWeek = Carbon::parse($order->created_at)->dayOfWeek;

            // Chỉ tính doanh thu cho các ngày từ Chủ nhật đến ngày hiện tại
            if ($orderDayOfWeek <= $today->dayOfWeek) {
                $daysRevenue[$orderDayOfWeek]['revenue'] += $order->total_amount; // Giả sử bạn có trường total_amount
            }
        }


        // Trả về doanh thu cho các ngày trong tuần
        return response()->json([
            'daysRevenue' => $daysRevenue,
        ]);
    }
    function listUsers(Request $request)
    {

        $users = User::get()->map(function ($user) {
            $newUser = new \stdClass();
            $isBuy = Customer::where("id_user", $user->id)->exists();


            $newUser->id = $user->id;
            $newUser->name = $user->name;
            $newUser->email = $user->email;
            $newUser->avatar = $user->avatar;
            $newUser->role = $user->role;
            $newUser->isBuy = $isBuy;


            return $newUser;
        });

        $totalUser = User::count();


        return response()->json([
            "users" => $users,

            "totalUser" => $totalUser,
        ]);
    }
    function deleteUser(Request $request)
    {
        $deleted = User::destroy($request->query("id"));
        return response()->json([
            "deleted" => $deleted
        ]);
    }
    function createTypeRam(Request $request)
    {
        $type_ram = new Ram();

        $type_ram->type_ram = $request->input("type_ram");
        $type_ram->save();
        return response()->json([
            "status"  => 1

        ]);
    }
    function createTypeRom(Request $request)
    {
        $type_rom = new Rom();

        $type_rom->type_rom = $request->input("type_rom");

        $type_rom->save();
        return response()->json([
            "status"  => 1

        ]);
    }
    function createColor(Request $request)
    {
        $color = new Color();

        $color->name_color = $request->input("name_color");
        $color->save();

        return response()->json([
            "status"  => 1

        ]);
    }
}
