<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Image;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;

use function Laravel\Prompts\select;

class OrderController extends Controller
{


    public function createOrder(Request $request)
    {
        $order = new Order();

        $order->id_customer = $request->input("id_customer");
        $order->status = "delivery";
        $order->total_amount = $request->input("total_amount");
        $order->name = $request->input("name");
        $order->phone_number = $request->input("phone_number");
        $order->address = $request->input("address");
        $order->note = $request->input("note");
        $order->method_payment = $request->input("method_payment");
        $order->save();

        $isCustomerExist = Customer::where("id_user", $request->input("id_customer"))->exists();

        if (!$isCustomerExist) {
            $newCustomer = new Customer();

            $newCustomer->name = $request->input("name");
            $newCustomer->id_user = $request->input("id_customer");
            $newCustomer->address = $request->input("address");
            $newCustomer->phone_number = $request->input("phone_number");

            $newCustomer->save();
        }





        // create order items
        return response()->json([

            "order_id" => $order->id
        ]);
    }
    public function createOrderItem(Request $request)
    {
        $order_item = new OrderItem();
        $url = Image::where("id_product", $request->input("id_product"))->value("url_image");


        $order_item->order_id = $request->input("order_id");
        $order_item->id_product = $request->input("id_product");
        $order_item->name = $request->input("name");
        $order_item->price = $request->input("price");
        $order_item->quantity = $request->input("quantity");
        $order_item->imageUrl =    $url;
        $order_item->ram = $request->input("ram");
        $order_item->rom = $request->input("rom");
        $order_item->color = $request->input("color");
        $order_item->save();
        return response()->json([
            "order_item" => $order_item
        ]);
    }
    public function getOrderItemsByOrderID(Request $request)
    {
        $order_items = OrderItem::whereHas('order', function ($query) use ($request) {
            $query->where('id_customer', $request->query("id_customer"));
        })->with("phone")->with("order")->get()->map(function ($order_item) {
            $new_order_item = new \stdClass();

            $new_order_item->id = $order_item->id;
            $new_order_item->order_id = $order_item->order_id;
            $new_order_item->id_product = $order_item->id_product;
            $new_order_item->id_user = $order_item->order->id_customer;
            $new_order_item->name = $order_item->order->name;
            $new_order_item->phone_number = $order_item->order->phone_number;
            $new_order_item->address = $order_item->order->address;
            $new_order_item->note = $order_item->order->note;
            $new_order_item->name_item = $order_item->phone->name;
            $new_order_item->imageUrl = $order_item->imageUrl;
            $new_order_item->price = $order_item->price;
            $new_order_item->color = $order_item->color;
            $new_order_item->ram = $order_item->ram;
            $new_order_item->rom = $order_item->rom;
            $new_order_item->quantity = $order_item->quantity;
            $new_order_item->total_amount = $order_item->total_amount;
            $new_order_item->status = $order_item->order->status;
            $new_order_item->method_payment = $order_item->order->method_payment;

            $new_order_item->order_day = Carbon::parse($order_item->created_at)->timezone('Asia/Ho_Chi_Minh')->format('d/m/Y');
            $new_order_item->order_received_day = Carbon::parse($order_item->created_at)->timezone('Asia/Ho_Chi_Minh')->addDays(2)->format('d/m/Y');
            return $new_order_item;
        });

        return response()->json([
            "order_items" => $order_items,
        ]);
    }
    function cancelOrder(Request $request)
    {
        $removed_order = Order::where("id", $request->input("id"))->update(["status" => "cancel"]);
        return response()->json([
            "status" => $removed_order
        ]);
    }

    function getReturnDataVNPay(Request $request)
    {
        $code = $request->query("vnp_ResponseCode") ?? null;
        if ($code === '00') {
            return response()->json([
                "code" => $code,
            ]);
        } else {
            return response()->json([
                "code" => $code,
            ]);
        }
    }
}
