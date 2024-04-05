<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BoardJob;
use Illuminate\Support\Facades\Auth;
use DB;

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

    function filterJobs(Request $request) {

        $jobs = DB::table('board_jobs')
                    ->where('title', 'like', '%' . $request->title . '%')
                    ->get();

        return response()->json([
            'jobs' => $jobs
        ]);
    }
}
