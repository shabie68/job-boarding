<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BoardJob;
use Illuminate\Support\Facades\Auth;

class BoardJobController extends Controller
{
    
    public function store(Request $request) {


    	$job = BoardJob::create([
            "user_id" => auth()->user()->id,
    		"title" => $request->title,
    		"description" => $request->description,
    		"location" => $request->location,
    		"type" => $request->type,
    		"responsibilities" => $request->responsibilities,
    		"requirements" => $request->requirements,
    		"salary" => $request->salary
    	]);
    	
    	return response()->json([
    		"job" => $job
    	]);
    }

    public function show() {

        $jobs = BoardJob::all();
        return response()->json([
            "jobs" => $jobs
        ]);
    }  

    function getJob($id) {

        $job = BoardJob::find($id);

        return response()->json([
            "job" => $job
        ]);
    }
}
