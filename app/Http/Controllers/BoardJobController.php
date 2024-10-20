<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BoardJob;
use Illuminate\Support\Facades\Auth;
use App\Models\Submission;
use App\Models\Company;
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

        $jobs = null;
        
        $submissions = Submission::where("user_id", auth()->user()->id);
                                
        $companyIds = $submissions->pluck("company_id");
        $companies = Company::find($companyIds);

        // $submissions = null;
        if(Company::all()->count() < 1) {
            
            return response()->json([
                "startupCompanies" => [],
                "role" => auth()->user()->role

            ]);
        }

        if(auth()->user()->role == 1) {

            $submissions = BoardJob::where('company_id', auth()->user()->company->id)->first()->submissions;
        }else {
            $submissions = Submission::where('user_id', auth()->user()->id)
                                    ->get();
        }

        if(!$request->has('title')) {
            $jobs = BoardJob::with('company')->paginate(1);
            
            return response()->json([
                "jobs" => $jobs,
                "role" => auth()->user()->role,
                "name" => auth()->user()->name,
                "company_id" => auth()->user()->company ? auth()->user()->company->id : -1,
                // "company" => auth()->user()->company->title
                "users" => \App\Models\User::all(),
                "authenticatedUser" => auth()->user()->id,
                "companies" => $companies,
                "submissions" => $submissions,
                "role" => auth()->user()->role
            ]);
        }
        
        $jobs = DB::table('board_jobs')
                    ->where('title', 'like', '%' . $request->title . '%')
                    ->whereNull('deleted_at')
                    ->paginate(1);
        
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

        event(new \App\Events\StatusLiked(auth()->user()->name, $request));

        return "event sent";
 
        // event(new \App\Events\StatusLiked("Test"))
    }

    function sendMessage(Request $request) {
        
        $company_user_id = null;

        $company = Company::find($request->id);
        if($company) {
            $company_user_id = $company->user_id;
        }

        if(auth()->user()->role == 2) {
            \App\Models\User::find($company_user_id)->notify(new ApplicationSubmitted(auth()->user(), $request->message));
            return "Message sent";
        }


        
        event(new \App\Events\MessageEvent(auth()->user(), $request));
        return 'Recruiter sent message';
        
    }
}
