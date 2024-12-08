<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RomProduct extends Model
{
    use HasFactory;
    protected $table = "product_rom";
    function rom()
    {
        return $this->belongsTo(Rom::class, "id_rom", "id");
    }
    function phone()
    {
        return $this->belongsTo(Phone::class, "id_product", "id");
    }
}
