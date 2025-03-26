<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RateController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware([\App\Http\Middleware\CorsMiddleware::class])->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });
    Route::post('/sign-up', [UserController::class, "signUp"])->name("user.sign-up");
    Route::post('/sign-in', [UserController::class, "signIn"])->name("user.sign-in");
    Route::get('/get-products', [ProductController::class, "listProducts"])->name("product.get-products");
    Route::get('/get-detail-product', [ProductController::class, "getDetailProduct"])->name("user.get-products");
    Route::get('/filter-product', [ProductController::class, "filterProduct"])->name("product.filter-product");
    Route::get('/cart/get-cart-item', [CartController::class, "getCartItems"])->name("cart.get-cart-item");
    Route::post('/cart/add-item-to-cart', [CartController::class, "addItemToCart"])->name("cart.add-item-to-cart");
    Route::get('/cart/count-cart-item', [CartController::class, "countCartItems"])->name("cart.count-cart-item");
    Route::delete('/cart/remove-cart-item', [CartController::class, "removeItemFromCart"])->name("cart.remove-cart-item");
    Route::patch('/cart/update-quantity-cart-item', [CartController::class, "upadteQuantityCartItem"])->name("cart.update-quantity-cart-item");
    Route::get('/csrf-token', function () {
        return response()->json(['csrf_token' => csrf_token()]);
    });
    // Get colors by id
    Route::get('/product/get-selection-product-by-id', [ProductController::class, "getSelectionProductById"])->name("product.get-color-product");
    Route::post('/product/create-ram-product', [ProductController::class, "createRamProduct"])->name("product.get-color-product");


    Route::get('/product/search-by-name', [ProductController::class, "searchProduct"])->name("product.search-by-name");
    Route::post('/product/create-product', [ProductController::class, "createProduct"])->name("product.search-by-name");
    Route::get('/orders/get-orders-by-order-id', [OrderController::class, "getOrderItemsByOrderID"])->name("orders.get-all-order-items");
    Route::post('/orders/create-order', [OrderController::class, "createOrder"])->name("orders.create-order");
    Route::post('/orders/create-order-item', [OrderController::class, "createOrderItem"])->name("orders.create-order-item");
    Route::patch('/orders/cancel-order', [OrderController::class, "cancelOrder"])->name("orders.cancel-order");

    // Rating router
    Route::post("/products/create-rate", [RateController::class, "createRating"]);
    Route::get("/products/list-rate", [RateController::class, "listRate"]);

    // Admin router
    Route::get("admin/get-count-visit", [AdminController::class, "getCountVisit"])->name("admin.count-visit");
    Route::patch("admin/increment-count-visit", [AdminController::class, "countVisit"])->name("admin.get-count-visit");


    Route::get("admin/customer/list-customers", [AdminController::class, "listCustomers"])->name("admin.list-customers");
    Route::get("admin/get-stats-info", [AdminController::class, "countStats"])->name("admin.get-stats-info");
    Route::get("admin/product/list-product", [AdminController::class, "listProducts"])->name("admin.list-product");
    Route::patch("admin/product/update-product", [AdminController::class, "updateProduct"])->name("admin.update-product");
    Route::delete("admin/product/delete-product", [AdminController::class, "deleteProduct"])->name("admin.delete-product");
    Route::post("admin/product/create-product", [AdminController::class, "createProduct"])->name("admin.create-product");
    Route::get("admin/orders/list-orders", [AdminController::class, "listOrders"])->name("admin.list-orders");
    Route::patch("admin/orders/update-status-order", [AdminController::class, "updateOrderStatus"])->name("admin.update-status-order");
    Route::get("admin/orders/get-revenue", [AdminController::class, "getRevenue"])->name("admin.get-revenue");
    Route::get("admin/user/get-user-information", [UserController::class, "getInformationUser"])->name("admin.get-user-information");
    Route::patch("admin/user/update-user-information", [UserController::class, "updateUserInformation"])->name("admin.get-user-information");
    Route::get("admin/user/list-user-information", [AdminController::class, "listUsers"])->name("admin.get-user-information");
    Route::delete("admin/user/delete-user", [AdminController::class, "deleteUser"])->name("admin.get-user-information");
    Route::post("/payment/payment-with_vnPay", [PaymentController::class, "paymentWithVNPay"]);
    Route::get("/back-up", [ProductController::class, "backUpdata"]);
    Route::get('/cart/count-cart-item', [CartController::class, "countCartItems"])->name("cart.count-cart-item");

    Route::post("/admin/product/create-type-ram", [AdminController::class, "createTypeRam"]);
    Route::post("/admin/product/create-type-rom", [AdminController::class, "createTypeRom"]);
    Route::post("/admin/product/create-color", [AdminController::class, "createColor"]);
});
