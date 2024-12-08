<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;
    protected $table = 'order_items';
    function order()
    {
        return $this->belongsTo(Order::class, "order_id", "id");
    }
    function phone()
    {
        return $this->belongsTo(Phone::class, "id_product", "id");
    }
    public function getCreatedAtVietnamAttribute()
    {
        return Carbon::parse($this->created_at)->timezone('Asia/Ho_Chi_Minh')->format('d/m/Y');
    }
}
