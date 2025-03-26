<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColorProduct extends Model
{
    use HasFactory;
    protected $table = "product_color";

    function colors()
    {
        return $this->belongsTo(Color::class, "id_color", "id");
    }

    function phones()
    {
        return $this->belongsTo(Phone::class, "id_product", "id");
    }
}
