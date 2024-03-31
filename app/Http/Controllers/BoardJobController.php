<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BoardJob;
use Illuminate\Support\Facades\Auth;

class BoardJobController extends Controller
{
    
    public function store(Request $request) {

    	$job = BoardJob::create([
            "user_id" => 1,
    		"title" => $request->title,
    		"description" => $request->description,
    		"location" => $request->location,
    		"job_type" => $request->job_type,
    		"job_responsibilities" => $request->job_responsibilities,
    		"job_requirements" => $request->job_requirements,
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
