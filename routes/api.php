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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Route::middleware("auth:sanctum")->post('/add-job', [App\Http\Controllers\BoardJobController::class, 'store']);
// Broadcast::routes(['middleware' => 'auth:sanctum']);
Route::middleware(["auth:sanctum", "role"])->post('/add-job', [App\Http\Controllers\BoardJobController::class, 'store']);

// Route::middleware('auth:sanctum')->get('get-user', function () {
// 	return auth()->user();
// });
Route::get('get-user', function() {
	return auth()->user();
});

Broadcast::routes(['middleware' => 'auth:sanctum']);

// Route::post("add-job-data/", [App\Http\Controllers\SubmissionController::class, 'addJobData'])->middleware('role');

Route::post("add-job-data/", [App\Http\Controllers\SubmissionController::class, 'addJobData']);


Route::put("save-profile/", [App\Http\Controllers\ProfileController::class, 'saveProfile'])->name('save.profile');
Route::get("get-profile/", [App\Http\Controllers\ProfileController::class, 'getProfile'])->name('get.profile');
Route::get("show-jobs", [App\Http\Controllers\BoardJobController::class, 'show']);
Route::get("filter-jobs", [App\Http\Controllers\BoardJobController::class, 'filterJobs']);
Route::put("apply/candidate/{user_id}/job/{board_id}", [App\Http\Controllers\SubmissionController::class, 'saveData']);
Route::get("get-submissions", [App\Http\Controllers\SubmissionController::class, 'getSubmissions']);
Route::post('start-chat', [App\Http\Controllers\BoardJobController::class, 'startChat']);

Route::post('send-msg', [App\Http\Controllers\BoardJobController::class, 'sendMessage']);

Route::post('accept/submission/{board_id}', [App\Http\Controllers\SubmissionController::class, 'acceptCandidate']);
Route::get('get-user-role', function() {
	return response()->json([
		"role" => auth()->user()->role
	]);
});

Route::middleware('auth:sanctum')->get("single-job/{id}", [App\Http\Controllers\BoardJobController::class, 'getJob']);
Route::group(['prefix' => 'company', 'as' => 'company'], function() {
	Route::get('show-companies', [\App\Http\Controllers\CompanyController::class, 'show'])->name('show.company');
	Route::put('/store', [\App\Http\Controllers\CompanyController::class, 'store'])->name('add.company');
	Route::put('add-review/{id}', [\App\Http\Controllers\CompanyController::class, 'addReview'])->name('review.company');
	
});