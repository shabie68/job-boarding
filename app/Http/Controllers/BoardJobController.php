<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BoardJob;
use Illuminate\Support\Facades\Auth;
use App\Notifications\ApplicationSubmitted;
use DB;

class BoardJobController extends Controller
{
    
    public function store(Request $request) {
    	$job = BoardJob::create([
            "user_id" => auth()->user()->id,
            "company_id" => auth()->user()->company->id,
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

    public function show(Request $request) {
        // event(new \App\Events\StatusLiked("HELLO"));
        
        // auth()->user()->notify(new ApplicationSubmitted(auth()->user()->name));
        // \App\Models\User::find(1)->notify(new ApplicationSubmitted(auth()->user()->name));
        // \App\Models\User::find(5)->notify(new ApplicationSubmitted(auth()->user()->name));
        

        $jobs = null;
        // event(new \App\Events\StatusLiked(auth()->user()->name));

        if(!$request->has('title')) {
            $jobs = BoardJob::paginate(5);
            
            return response()->json([
                "jobs" => $jobs,
                "role" => auth()->user()->role,
                "name" => auth()->user()->name,
                "company_id" => auth()->user()->company ? auth()->user()->company->id : -1,
                // "company" => auth()->user()->company->title
                "users" => \App\Models\User::all(),
                "authenticatedUser" => auth()->user()->id
            ]);

        }
        
        $jobs = DB::table('board_jobs')
                    ->where('title', 'like', '%' . $request->title . '%')
                    ->paginate(2);

        return response()->json([
            "jobs" => $jobs,
            "name" => auth()->user()->name,
            "users" => \App\Models\User::all(),
            "authenticatedUser" => auth()->user()->id,
            'role' => auth()->user()->role
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
                    ->paginate(1);

        return response()->json([
            'jobs' => $jobs
        ]);
    }

    function startChat(Request $request) {

        // event(new \App\Events\StatusLiked(auth()->user()->id, $request->id));
        event(new \App\Events\StatusLiked(auth()->user()->name, $request));

        return "event sent";
 
        // event(new \App\Events\StatusLiked("Test"))
    }

    function sendMessage(Request $request) {
        
        if(auth()->user()->role == 2) {
            \App\Models\User::find($request->id)->notify(new ApplicationSubmitted(auth()->user(), $request->message));
            return "Message sent";
        }


        
        event(new \App\Events\MessageEvent(auth()->user(), $request));
        return 'Recruiter sent message';
        
    }
}
