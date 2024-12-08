<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cart_item', function (Blueprint $table) {
            $table->id();
            $table->foreignId("id_cart_item")
                ->constrained("phones");

            $table->foreignId("id_customer")
                ->constrained("users");
            $table->integer("price");
            $table->integer("quantity");
            $table->decimal('total_price', 12, 2)->as('price * quantity')->stored();
            $table->enum('status', ['not-paid', 'delivery', 'paid']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_item');
    }
};
