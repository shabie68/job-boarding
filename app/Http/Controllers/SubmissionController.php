<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submission;
use App\Models\BoardJob;

class SubmissionController extends Controller
{
    

    public function addJobData(Request $request) {

    	$submission = Submission::updateOrCreate(
            ['user_id' => auth()->user()->id, 'board_job_id' => $request->jobId],
    		
            [
                'first_name' => auth()->user()->name,
        		'last_name' => auth()->user()->name,
                'email' => 'test@gmail.com',
        		'phone_number' => 00,
        		'country' => 'pakistan',
        		'resume' => 'dummy file',
        		'state' => 'kpk',
        		'ability_to_commute' => 'yes',
        		'salary_expectation' => '40000',
        		'notice_period' => '14'
            ]);

    	return response()->json([
    		'submission' => $submission
    	]);
    }
    public function saveData(Request $request, $candidate_id, $board_job_id) {

	  // $imageName = time().'.'.$request->image->getClientOriginalExtension();

	  $submission = Submission::updateOrCreate(
	  	['user_id' => auth()->user()->id, 'board_job_id' => $board_job_id],
	  	[

	  		'first_name' => $request->has('first_name') ? $request->first_name : $request->submission['first_name'],
	  		'last_name' => $request->has('last_name') ? $request->last_name : $request->submission['last_name'],
	  		'phone_number' => $request->has('phone_number') ? $request->phone_number : $request->submission['phone_number'],
	  		'email' => $request->has('email') ? $request->email : $request->submission['email'],

	  		'country' => $request->has('country') ? $request->country : $request->submission['country'],
	  		'resume' => $request->has('resume') ? $request->resume : $request->submission['resume'],
	  		'state' => $request->has('state') ? $request->state : $request->submission['state'],
	  		'ability_to_commute' => $request->has('ability_to_commute') ? $request->ability_to_commute : $request->submission['ability_to_commute'],
	  		'salary_expectation' => $request->has('salary_expectation') ? $request->salary_expectation : $request->submission['salary_expectation'],
	  		'notice_period' => $request->has('notice_period') ? $request->notice_period : $request->submission['notice_period'],
	  	]
	  );


      return response()->json([
        "submission" => $submission
      ]);
    }
}
