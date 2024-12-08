<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\ImageRate;
use App\Models\Rate;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RateController extends Controller
{
    //
    function createRating(Request $request)
    {
        $rate = new Rate();

        $rate->id_user = $request->input("id_user");
        $rate->id_product = $request->input("id_product");
        $rate->star = $request->input("star");
        $rate->comment = $request->input("comment");



        $rate->save();

        $images = $request->input("images");
        foreach ($images as $image) {
            $imageRate = new ImageRate();
            $imageRate->id_rate = $rate->id;
            $imageRate->image_url = $image;
            $imageRate->save();
        }



        return response()->json([
            "rate" => $rate,
            "status" => true,
        ]);
    }
    function listRate(Request $request)
    {
        $listRates = Rate::where("id_product", $request->query("id_product"))->orderBy('created_at', 'desc')->get()->map(function (Rate $rate) {
            $image_rates = ImageRate::where("id_rate", $rate->id)->pluck("image_url");
            $avatarUser = User::where("id", $rate->id_user)->pluck("avatar");
            $nameUser = User::where("id", $rate->id_user)->pluck("name");
            $formattedDate = Carbon::parse($rate->created_at)->format('d-m-Y');




            $rate->date_rate = $formattedDate;
            $rate->image_rates = $image_rates;
            $rate->created_at = $formattedDate;
            $rate->avatar = $avatarUser;
            $rate->name = $nameUser;

            return $rate;
        });
        return response()->json([
            "rates" => $listRates
        ]);
    }
}
