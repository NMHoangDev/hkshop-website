<?php

namespace App\Http\Controllers;

use App\Models\ColorProduct;
use App\Models\Image;
use App\Models\Phone;
use App\Models\RamProduct;
use App\Models\Rate;
use App\Models\RomProduct;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Object_;
use Illuminate\Support\Str;
use stdClass;

class ProductController extends Controller
{
    //
    function listProducts(Request $request)
    {
        $products = Phone::with(['product_ram.ram', 'product_rom.rom'])
            ->paginate(9);

        // Lấy collection và áp dụng map
        $products->setCollection(
            $products->getCollection()->map(function ($product) {
                $image_url_array = Image::where("id_product", $product->id)->pluck("url_image");

                $newProduct = new \stdClass();
                $newProduct->id = $product->id;
                $newProduct->name = $product->name;
                $newProduct->price = $product->price;
                $newProduct->frequency = $product->frequency;
                $newProduct->tech_screen = $product->tech_screen;
                $newProduct->pin = $product->pin;
                $newProduct->os = $product->os;
                $newProduct->screen = $product->screen;
                $newProduct->nameChip = $product->nameChip;
                $newProduct->imagesUrl = $product->imagesUrl;
                $newProduct->ram = $product->product_ram->ram->type_ram ?? null;
                $newProduct->rom = $product->product_rom->rom->type_rom ?? null;
                $newProduct->image_urls = $image_url_array ?? null;
                return $newProduct;
            })
        );

        return response()->json([
            "products" => $products,
        ]);
    }
    function backUpdata(Request $request)
    {
        $phones = Phone::get()->map(function (Phone $phone) {
            $isExitsRam =  RamProduct::where('id_product', $phone->id)->exists();

            if ($isExitsRam) {
                for ($i = 1; $i <= 4; $i++) {
                    $ramProduct = new RamProduct();
                    $ramProduct->id_product = $phone->id;
                    $ramProduct->id_ram = $i;
                };
            };
            return $phone;
        });
        return response()->json([
            "status" => "success",
        ]);
    }
    function createProduct(Request $request)
    {
        $phone = new Phone();
        $randomNumber = Str::random(10);
        $randomNumber = random_int(10, 99);

        $phone->name = $request->input("name");
        $phone->nameChip = $request->input("nameChip");
        $phone->price = $request->input("price");
        $phone->frequency = $request->input("frequency");
        $phone->pin = $request->input("pin");
        $phone->tech_screen = $request->input("tech_screen");
        $phone->screen = $request->input("screen_size");
        $phone->imagesUrl = $request->input("image_url");
        $phone->os = $request->input("os");
        $phone->resolution = $request->input("resolution");
        $phone->quantity = $randomNumber;

        $phone->save();
        return response()->json([
            "products" => $phone,
        ]);
    }

    function getDetailProduct(Request $request)
    {
        $detailProduct = Phone::where("id", "=", $request->query->get("id"))->get()->map(function (Phone $product) {

            $image_url_array = Image::where("id_product", $product->id)->pluck("url_image");
            $totalStar = 0;
            $averRate = 0;
            $numberOfRate = Rate::where("id_product", $product->id)->count();
            $rates = Rate::where("id_product", $product->id)->pluck("star");
            foreach ($rates as  $rate) {
                $totalStar = $totalStar + $rate;
            };
            if ($totalStar != 0 && $numberOfRate != 0) {
                $averRate = $totalStar / $numberOfRate;
            }

            $newProduct = new \stdClass();
            $newProduct->id = $product->id;
            $newProduct->name = $product->name;
            $newProduct->price = $product->price;
            $newProduct->frequency = $product->frequency;
            $newProduct->tech_screen = $product->tech_screen;
            $newProduct->pin = $product->pin;
            $newProduct->os = $product->os;
            $newProduct->screen = $product->screen;
            $newProduct->nameChip = $product->nameChip;
            $newProduct->brand = $product->brand;
            $newProduct->resolution = $product->resolution;
            $newProduct->ram = $product->product_ram->ram->type_ram ?? null;
            $newProduct->rom = $product->product_rom->rom->type_rom ?? null;
            $newProduct->image_urls = $image_url_array ?? null;
            $newProduct->rate = round($averRate, 1);
            return $newProduct;
        });
        return response()->json([
            "detail" => $detailProduct,
        ]);
    }
    function filterProduct(Request $request)
    {
        $ram = $request->query("ram");
        $price = $request->query("price");
        $frequency = $request->query("frequency");
        $pin = $request->query("pin");
        $screenSize = $request->query("screenSize");


        $query = Phone::query();



        if ($price || $price != "0") {
            $query->where("price", "<=", $price);
        }
        if ($frequency || $frequency != "0") {
            $query->where("frequency", "<=", $frequency);
        }
        if ($pin || $pin != "0") {
            $query->where("pin", "<=", $pin);
        }

        if ($screenSize || $screenSize != "0") {
            $query->where("screen", "<=", $screenSize);
        }
        $products = $query->with(['product_ram.ram', 'product_rom.rom'])
            ->paginate(9)
            ->appends([
                'price' => $price,
                "ram" => $ram,
                "frequency" => $frequency,
                "pin" => $pin,
                "screen" => $screenSize
            ]);

        $products->getCollection()->transform(function (Phone $product) {
            $image_url_array = Image::where("id_product", $product->id)->pluck("url_image");

            $newProduct = new \stdClass();
            $newProduct->id = $product->id;
            $newProduct->name = $product->name;
            $newProduct->price = $product->price;
            $newProduct->frequency = $product->frequency;
            $newProduct->tech_screen = $product->tech_screen;
            $newProduct->pin = $product->pin;
            $newProduct->os = $product->os;
            $newProduct->screen = $product->screen;
            $newProduct->nameChip = $product->nameChip;
            $newProduct->resolution = $product->resolution;
            $newProduct->ram = $product->product_ram->ram->type_ram ?? null;
            $newProduct->rom = $product->product_rom->rom->type_rom ?? null;
            $newProduct->image_urls = $image_url_array ?? null;

            return $newProduct;
        });

        return response()->json([
            "products" => $products,
        ]);
    }
    public function searchProduct(Request $request)
    {
        $name = $request->query("name");

        // Check if the 'name' query parameter exists
        if (!$name) {
            return response()->json([
                "message" => "Please provide a name to search for.",
                "products" => [],
            ], 200); // Returning a 400 Bad Request status
        }

        // Perform the search
        $searchProducts = Phone::whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($name) . '%'])->get()->map(function (Phone $phone) {
            $newPhone = new \stdClass();
            $image = Image::where("id_product", $phone->id)->value("url_image");
            $newPhone->id = $phone->id;
            $newPhone->name = $phone->name;
            $newPhone->url_image = $image;

            return $newPhone;
        });


        return response()->json([
            "products" => $searchProducts,
        ]);
    }
    public function getSelectionProductById(Request $request)
    {
        $id_product =  $request->query("id_product");
        $colors = ColorProduct::where("id_product", $id_product)->with("colors")->get()->map(function ($color) {
            $new_color = new \stdClass();
            $new_color->id_product = $color->id_product;
            $new_color->color = $color->colors->name_color;

            return $new_color;
        });
        $rams = RamProduct::where("id_product", $id_product)->with("ram")->get()->map(function ($ram) {
            $new_ram = new \stdClass();
            $new_ram->id_product = $ram->id_product;
            $new_ram->ram = $ram->ram->type_ram;

            return $new_ram;
        });
        $roms = RomProduct::where("id_product", $id_product)->with("rom")->get()->map(function ($rom) {
            $new_rom = new \stdClass();
            $new_rom->id_product = $rom->id_product;
            $new_rom->rom = $rom->rom->type_rom;

            return $new_rom;
        });
        return response()->json(
            [
                "colors" => $colors,
                "roms" => $roms,
                "rams" => $rams
            ]
        );
    }
    public function getRamProductById(Request $request)
    {
        $id_product =  $request->query("id_product");
        $rams = RamProduct::where("id_product", $id_product)->with("ram")->get()->map(function ($ram) {
            $new_ram = new \stdClass();
            $new_ram->id_product = $ram->id_product;
            $new_ram->ram = $ram->ram->type_ram;

            return $new_ram;
        });
        return response()->json(
            [
                "rams" => $rams
            ]
        );
    }
    public function getRomProductById(Request $request)
    {
        $id_product =  $request->query("id_product");
        $colors = RamProduct::where("id_product", $id_product)->with("colors")->get()->map(function ($color) {
            $new_color = new \stdClass();
            $new_color->id_product = $color->id_product;
            $new_color->color = $color->colors->name_color;

            return $new_color;
        });
        return response()->json(
            [
                "roms" => $colors
            ]
        );
    }
    function createRamProduct(Request $request)
    {


        for ($id = 31; $id <= 59; $id++) {
            // Lấy số ngẫu nhiên từ 1 đến 5 để quyết định số lượng bản ghi
            $randomNumber = random_int(1, 5);

            for ($idRam = 1; $idRam <= $randomNumber; $idRam++) {
                $productRam = new ColorProduct();
                $productRam->id_product = $id;
                $productRam->id_color = $idRam;
                $productRam->save();
            }
        }
        return response()->json([
            "mesage" => "success"
        ]);
    }
}
