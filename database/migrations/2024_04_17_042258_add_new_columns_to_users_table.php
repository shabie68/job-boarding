<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewColumnsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('summary')->after('role');
            $table->string('address')->after('email_verified_at');
            $table->string('education')->after('role');
            $table->json('skills')->after('email');
            $table->string('phone_number')->after('name');

            //
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('summary');
            $table->dropColumn('address');
            $table->dropColumn('education');
            $table->dropColumn('skills');
            $table->dropColumn('phone_number');
        });
    }
}
