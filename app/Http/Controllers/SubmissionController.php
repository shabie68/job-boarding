<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submission;
use App\Models\BoardJob;
use Carbon\Carbon;

class SubmissionController extends Controller
{
    
    public function addJobData(Request $request) {

        $submission = Submission::where('user_id', auth()->user()->id)
                                ->where('board_job_id', $request->jobId)
                                ->first();
        if(!$submission) {
            $submission = Submission::create([
                'user_id' => auth()->user()->id,
                'first_name' => auth()->user()->name,
                'board_job_id' => $request->jobId,
                'last_name' => auth()->user()->name,
                'email' => 'test@gmail.com',
                'phone_number' => 00,
                'country' => 'pakistan',
                'resume' => 'dummy file',
                'state' => 'kpk',
                'ability_to_commute' => 'yes',
                'salary_expectation' => '40000',
                'notice_period' => '14',
                'schedule_interview' => Carbon::now()
            ]);
        }
    	

    	return response()->json([
    		'submission' => $submission
    	]);
    }
    public function saveData(Request $request, $candidate_id, $board_job_id) {

        $resume = null;

        if($request->file('resume')) {
            $destinationPath = 'uploads';
            $resume = $request->file('resume')->getClientOriginalName();
            $request->file('resume')->move(public_path($destinationPath), $resume);  
             
        }

        $submission = json_decode($request->submission);  
        $submission = Submission::updateOrCreate(
        	['user_id' => auth()->user()->id, 'board_job_id' => $board_job_id],
        	[
        		'first_name' => $request->has('first_name') ? $request->first_name : $submission->first_name,
        		'last_name' => $request->has('last_name') ? $request->last_name : $submission->last_name,
        		'phone_number' => $request->has('phone_number') ? $request->phone_number : $submission->phone_number,
        		'email' => $request->has('email') ? $request->email : $submission->email,

        		'country' => $request->has('country') ? $request->country : $submission->country,
        		'resume' => $request->has('resume') ? $resume : $submission->resume,
        		'state' => $request->has('state') ? $request->state : $submission->state,
        		'ability_to_commute' => $request->has('ability_to_commute') ? $request->ability_to_commute : $submission->ability_to_commute,
        		'salary_expectation' => $request->has('salary_expectation') ? $request->salary_expectation : $submission->salary_expectation,
        		'notice_period' => $request->has('notice_period') ? $request->notice_period : $submission->notice_period,
            'schedule_interview' => $request->has('schedule_interview') ? $request->schedule_interview : Carbon::parse($submission->schedule_interview)
        	]
        );


        return response()->json([
         "submission" => $submission
        ]);
    }
}
