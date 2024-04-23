<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\ConfirmApplication;
use Illuminate\Support\Facades\Mail;

class ProfileController extends Controller
{
    
    public function saveProfile(Request $request, ConfirmApplication $confirm) {

    	$user = User::find(auth()->user()->id);

    	$user->update([
    		"summary" => $request->summary,
    		"skills" => $request->skills,
    		"phone_number" => $request->phoneNumber,
    		"address" => $request->address,
    		"education" => $request->education

    	]);

        Mail::to('shabeeulhassan40@gmail.com', 'Shabie')->send($confirm);

    	return response()->json([
    		"user" =>$user
    	]);
    }

    public function getProfile(Request $request) {

    	$user = User::find(auth()->user()->id);

    	return response()->json([
    		"user" =>$user
    	]);
    }
}
