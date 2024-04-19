<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ProfileController extends Controller
{
    
    public function saveProfile(Request $request) {

    	$user = User::find(auth()->user()->id);

    	auth()->user()->update([
    		"summary" => $request->summary,
    		"skills" => $request->skills,
    		"phone_number" => $request->phoneNumber,
    		"address" => $request->address,
    		"education" => "Bachelor"

    	]);

    	return response()->json([
    		"user" =>auth()->user()
    	]);
    }
}
