<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBoardJobsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('board_jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string("title");
            $table->longText("description");
            $table->string("location");
            $table->string("type");
            $table->longText("responsibilities");
            $table->longText("requirements");
            $table->integer("salary");
            $table->tinyInteger('status')->default(1);
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
        Schema::dropIfExists('board_jobs');
    }
}
