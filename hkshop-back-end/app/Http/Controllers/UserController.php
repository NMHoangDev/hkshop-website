<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function signUp(Request $request)
    {
        $isExisting = User::where("email", "=", $request->input("email"))->exists();
        if (!$isExisting) {
            $user = new User();
            $user->name = $request->input("name");
            $user->email = $request->input("email");
            $user->password = bcrypt($request->input('password'));
            $user->role = "user";

            $user->save();

            return response()->json([
                "user" => $user,
                "status" => "success",
                "password" => $request->input("password"),
                "message" => "Đăng kí thành công"
            ]);
        } else {
            return response()->json([
                "status" => "error",
                "error" => "Email address already used"
            ]);
        }
    }
    function signIn(Request $request)
    {
        $user = User::where("email", $request->input("email"))->first();

        if ($user) {
            // Kiểm tra mật khẩu
            if (Hash::check($request->input("password"), $user->password)) {
                return response()->json(["status" => "success", "user" => $user, "password" => $request->input("password")]);
            } else {
                return response()->json(["status" => "error", "message" => "Sai mật khẩu, Vui lòng nhập lại"]);
            }
        } else {
            return response()->json(["status" => "error", "message" => "Tài khoản không tồn tại, vui lòng nhập đúng email"]);
        }
    }
    function getInformationUser(Request $request)
    {
        $userInformation = User::where("id", "=", $request->query("id"))->first();
        return response()->json([
            "user" => $userInformation
        ]);
    }
    function updateUserInformation(Request $request)
    {

        $id = $request->input("id");
        $updateValue = [
            "name" => $request->input("name"),
            "email" => $request->input("email"),
            "_hk_pay_code" => $request->input("hkCode"),
            "password" => bcrypt($request->input('password')),
        ];
        if ($request->input("avatar") != "") {
            $updateValue = [...$updateValue, "avatar" => $request->input("avatar")];
        }
        $updated = User::where("id", $id)->update($updateValue);
        return response()->json([
            "updated" => $updated
        ]);
    }
}
