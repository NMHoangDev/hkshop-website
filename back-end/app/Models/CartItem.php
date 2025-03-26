<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $table = 'cart_item';

    public function phone()
    {
        return $this->belongsTo(Phone::class, 'id_cart_item', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_customer', 'id');
    }
}
