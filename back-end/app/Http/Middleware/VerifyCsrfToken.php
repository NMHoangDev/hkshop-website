<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
        '/sign-up',
        "/sign-in",
        "/cart/add-item-to-cart",
        "cart/remove-cart-item",
        "cart/update-quantity-cart-item",
        "/payment/payment-with-vnpay",
        "/orders/create-order",
        "/orders/create-order-item",
        "/product/get-color-product-by-id",
        "/product/create-product",
        "/product/create-ram-product",
        "/orders/cancel-order",
        "/admin/customer/list-customers",
        "/admin/get-stats-info",
        "/admin/product/list-product",
        "/admin/product/update-product",
        "/admin/product/delete-product",
        "/admin/product/create-product",
        "/admin/orders/update-status-order",
        "admin/orders/get-revenue",
        "/admin/user/update-user-information",
        "/admin/user/list-user-information",
        "/admin/user/delete-user",
        "/payment/payment-with_vnPay",
        "/back-up",
        "/admin/product/create-type-ram",
        "/admin/product/create-type-rom",
        "/admin/product/create-color",
        "/products/create-rate",
        "/products/list-rate",
        "/vnpayment",
        "/admin/get-count-visit",
        "/admin/increment-count-visit"

    ];
}
