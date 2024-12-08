<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phone extends Model
{
    use HasFactory;
    function product_ram()
    {
        return $this->belongsTo(RamProduct::class, "id", "id_product");
    }
    function product_rom()
    {
        return $this->belongsTo(RomProduct::class, "id", "id_product");
    }
}
