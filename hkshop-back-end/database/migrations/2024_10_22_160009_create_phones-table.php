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
        //
        Schema::create('phones', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string("name");
            $table->integer("ram");
            $table->integer("price");
            $table->integer("frequency");
            $table->integer("pin");
            $table->integer("screen");
            $table->string("nameChip");
            $table->string("imagesUrl");
            $table->string("imagesUrl-1");
            $table->string("imagesUrl-2");
            $table->string("imagesUrl-3");
            $table->string("imagesUrl-4");
            $table->string("color");
            $table->integer("quantity")->nullable()->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
