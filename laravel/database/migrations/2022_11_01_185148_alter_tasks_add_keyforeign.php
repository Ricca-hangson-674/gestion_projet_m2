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
        Schema::table('nrh_tasks', function (Blueprint $table) {
            $table->unsignedBigInteger('project_id')->unsigned();
            $table->foreign('project_id')->references('id')->on('nrh_projects')
                ->onDelete('restrict')
                ->onUpdate('restrict');

            $table->unsignedBigInteger('backlog_id')->unsigned();
            $table->foreign('backlog_id')->references('id')->on('nrh_backlogs')
                ->onDelete('restrict')
                ->onUpdate('restrict');

            $table->unsignedBigInteger('column_id')->unsigned()->nullable();
            $table->foreign('column_id')->references('id')->on('nrh_columns')
                ->onDelete('restrict')
                ->onUpdate('restrict');

            $table->unsignedBigInteger('sprint_id')->unsigned()->nullable();
            $table->foreign('sprint_id')->references('id')->on('nrh_sprints')
                ->onDelete('restrict')
                ->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
