<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    //
    function paymentWithVNPay(Request $request)
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:3000/checkout";
        $vnp_TmnCode = "EAFMT0F2"; //Mã website tại VNPAY
        $vnp_HashSecret = "DPO1A202SDQK0ZJQKKX74J2YDZW501PI"; //Chuỗi bí mật

        $vnp_TxnRef = $request->input("order_id");
        $vnp_OrderInfo = "Thanh toan hoa don" . $request->input("order_id");
        $vnp_OrderType = "Thanh toan hoa don";
        $vnp_Amount = $request->input("total_amount") * 100;
        $vnp_Locale = "vn";
        $vnp_BankCode = $request->input("method_payment");
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,

        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00',
            'message' => 'success',
            'data' => $vnp_Url
        );
        if (isset($_POST['redirect'])) {
            header('Location: ' . $vnp_Url);
            die();
        } else {
            echo json_encode($returnData);
        }
    }
    function vnPayReturn(Request $request)
    {
        $vnpAmount = $request->query('vnp_Amount');
        $vnpResponseCode = $request->query('vnp_ResponseCode');
        if ($vnpResponseCode == 00) {
            return response()->json([
                "amount" => $vnpAmount,
                "vnpResponseCode" => $vnpResponseCode,
                "status" => "success"
            ]);
        } else {
            return response()->json([
                "amount" => $vnpAmount,
                "vnpResponseCode" => $vnpResponseCode,
                "status" => "failure"

            ]);
        }
    }
}
