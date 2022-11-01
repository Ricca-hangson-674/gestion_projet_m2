<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nrh_backlogs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');

            $table->unsignedBigInteger('responsible')->unsigned();
            $table->foreign('responsible')->references('id')->on('nrh_users')
                ->onDelete('restrict')
                ->onUpdate('restrict');
            $table->unsignedBigInteger('createdBy')->unsigned();
            $table->foreign('createdBy')->references('id')->on('nrh_users')
                ->onDelete('restrict')
                ->onUpdate('restrict');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nrh_backlogs');
    }
};
