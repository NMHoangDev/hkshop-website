<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RamProduct extends Model
{
    use HasFactory;
    protected $table = "product_ram";
    function ram()
    {
        return $this->belongsTo(Ram::class, "id_ram", "id");
    }
    function phone()
    {
        return $this->belongsTo(Phone::class, "id_product", "id");
    }
}
