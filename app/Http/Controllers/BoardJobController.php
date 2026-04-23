<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BoardJob;
use Illuminate\Support\Facades\Auth;
use App\Models\Submission;
use App\Models\Company;
use App\Notifications\ApplicationSubmitted;
use Illuminate\Http\JsonResponse;
use DB;

class BoardJobController extends Controller
{
    
    public function store(Request $request): JsonResponse {

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'responsibilities' => 'required|string',
            'requirements' => 'required|string',
            'salary' => 'required|numeric',
        ]);

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
    	], 201);
    }

    public function show(Request $request) : JsonResponse {

        $jobs = null;
        
        $submissions = Submission::where("user_id", auth()->user()->id);
                                
        $companyIds = $submissions->pluck("company_id");
        $companies = Company::find($companyIds);

        if(!Company::exists()) {
            return response()->json([
                "startupCompanies" => [],
                "role" => auth()->user()->role
            ]);
        }

        if(auth()->user()->role == 1) {
            $submissions = auth()->user()->company 
                            ? Submission::where('company_id', auth()->user()->company->id)->get()
                            : collect(); // empty collection if no company 
        }else {
            $submissions = Submission::where('user_id', auth()->user()->id)
                                    ->get();
        }

        if(!$request->has('title')) {
            $jobs = BoardJob::with('company')->paginate(5);
            
            return response()->json([
                "jobs" => $jobs,
                "role" => auth()->user()->role,
                "name" => auth()->user()->name,
                "company_id" => auth()->user()->company ? auth()->user()->company->id : -1,
                "users" => \App\Models\User::all(),
                "authenticatedUser" => auth()->user()->id,
                "companies" => $companies,
                "submissions" => $submissions,
            ]);
        }
        
        $jobs = BoardJob::with('company')
                        ->where('title', 'like', '%' . $request->title . '%')
                        ->paginate(5);

        
        return response()->json([
            "jobs" => $jobs,
            "name" => auth()->user()->name,
            "users" => \App\Models\User::all(),
            "authenticatedUser" => auth()->user()->id,
            'role' => auth()->user()->role
        ]);
    }  

    public function getJob($id): JsonResponse {

        $job = BoardJob::find($id);

        return response()->json([
            "job" => $job
        ]);
    }

    public function filterJobs(Request $request): JsonResponse
    {
        // Validate the input
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        // Use Eloquent query builder for consistency and relationships
        $jobs = BoardJob::with('company')  // eager load company relationship
                        ->where('title', 'like', '%' . $request->title . '%')
                        ->paginate(5); 

        // Return JSON response
        return response()->json([
            'jobs' => $jobs,
            'total' => $jobs->total(),
            'per_page' => $jobs->perPage(),
            'current_page' => $jobs->currentPage(),
        ]);
}

    function startChat(Request $request): string {

        event(new \App\Events\StatusLiked(auth()->user()->name, $request));
        return "event sent";
    }

    public function sendMessage(Request $request): JsonResponse
    {
        // Validate input
        $request->validate([
            'id' => 'required|integer|exists:companies,id',
            'message' => 'required|string|max:2000',
        ]);

        $company = Company::find($request->id);

        // Handle HR vs recruiter roles
        if (auth()->user()->role == 2) { // Normal user sending to company
            $recipient = User::find($company->user_id);

            if (!$recipient) {
                return response()->json([
                    'success' => false,
                    'message' => 'The company does not have a user to notify.'
                ], 404);
            }

            $recipient->notify(new ApplicationSubmitted(auth()->user(), $request->message));

            return response()->json([
                'success' => true,
                'message' => 'Message sent successfully.'
            ]);
        }

        // Recruiter sending message (role != 2)
        event(new \App\Events\MessageEvent(auth()->user(), $request));

        return response()->json([
            'success' => true,
            'message' => 'Recruiter sent message successfully.'
        ]);
    }
}
