<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyControllersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_controllers', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('logo');
            $table->text('description');
            $table->string('locations');
            $table->integer('total_employees');
            $table->string('website');
            $table->json('contact_information');
            $table->string('industry');
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
        Schema::dropIfExists('company_controllers');
    }
}
