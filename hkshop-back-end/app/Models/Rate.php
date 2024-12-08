<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    use HasFactory;
    protected $table = 'rates';

    function users()
    {
        return $this->belongsTo(User::class, "id_user", "id");
    }
    function phones()
    {
        return $this->belongsTo(User::class, "id_product", "id");
    }
}
