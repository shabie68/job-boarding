<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware("auth:sanctum")->post('/add-job', [App\Http\Controllers\BoardJobController::class, 'store']);
Route::middleware('auth:sanctum')->get('get-user', function () {
	return auth()->user();
});


Route::get("show-jobs", [App\Http\Controllers\BoardJobController::class, 'show']);
Route::get("filter-jobs", [App\Http\Controllers\BoardJobController::class, 'filterJobs']);

Route::middleware('auth:sanctum')->get("single-job/{id}", [App\Http\Controllers\BoardJobController::class, 'getJob']);
