<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Image;
use App\Models\Phone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use stdClass;

class CartController extends Controller
{
    //
    function getCartItems(Request $request)
    {

        $cartItems = CartItem::where('id_customer', $request->query("idCustomer"))->with('phone')->get()->map(function (CartItem $item) {
            $image_url_array = Image::where("id_product", $item->phone->id)->pluck("url_image");
            $item->image_url = $image_url_array[0];
            return $item;
        });
        return response()->json([
            "cart_items" => $cartItems
        ]);
    }
    function addItemToCart(Request $request)
    {
        $isExists = CartItem::where("id_cart_item", $request->idProduct)->where("id_customer", $request->idCustomer)->exists();
        if (!$isExists) {
            $cartItem = new CartItem();

            $cartItem->id_cart_item = $request->idProduct;
            $cartItem->id_customer = $request->idCustomer;
            $cartItem->price = $request->price;
            $cartItem->quantity = $request->quantity;
            $cartItem->status = $request->status;
            $cartItem->ram = $request->ram;
            $cartItem->rom = $request->rom;
            $cartItem->color = $request->color;
            $cartItem->total_price = $request->price * $request->quantity;

            $cartItem->save();
            return response()->json([
                "cartItem" => $cartItem,
            ]);
        } else {
            $cartItem = CartItem::where("id_cart_item", $request->idProduct)->increment("quantity");
            return response()->json([
                "cartItem" => $cartItem,
            ]);
        }
    }
    function countCartItems(Request $request)
    {
        $idCustomer = $request->query("id-customer");
        $countCartItems = CartItem::where("id_customer", $request->query("id-customer"))->count();
        return response()->json([
            "countCartItems" => $countCartItems,
            "id" =>   $idCustomer
        ]);
    }
    function removeItemFromCart(Request $request)
    {
        $id = $request->query("id");
        $removedItems = CartItem::destroy($id);
        return response()->json([
            "status" => $removedItems,
            "idItems" => $id
        ]);
    }


    function upadteQuantityCartItem(Request $request)
    {
        $id = $request->id;
        $type = $request->type;

        if ($type == "increase") {
            $idCartItem = CartItem::find($id)->id_cart_item;
            $quantityOfCartItem = CartItem::find($id)->quantity;
            $quantityOfProduct = Phone::find($idCartItem)->quantity;


            if ($quantityOfCartItem < $quantityOfProduct) {
                $isIncrease = CartItem::where("id", $id)->increment("quantity");
                CartItem::where('id', $id)->update([
                    'total_price' => DB::raw('price * quantity')
                ]);
                return response()->json([
                    "isIncreased" => $isIncrease,
                    "total_quantity" => $quantityOfProduct
                ]);
            } else {
                $stringQuantity = strval($quantityOfProduct);
                return response()->json([
                    "message" => "Số lượng trong kho chỉ còn " . $stringQuantity . " sản phẩm"
                ]);
            }
        } elseif ($type == "decrease") {
            $isMin = CartItem::where("id", $id)->where("quantity", "=", "1")->exists();
            if (!$isMin) {
                $isDecreased = CartItem::where("id", $id)->increment("quantity", -1);
                CartItem::where('id', $id)->update([
                    'total_price' => DB::raw('price * quantity')
                ]);
            } else {
                $removedItems = CartItem::destroy($id);
                return response()->json([
                    "message" => "Đã xóa sản phẩm khỏi giỏ hàng !"
                ]);
            }


            return response()->json([
                "isDecreased" => $isDecreased,
                "isMin" => $isMin,
            ]);
        }
    }
}
