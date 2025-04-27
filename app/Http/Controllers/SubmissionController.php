<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\ConfirmApplication;
use App\Mail\SendResume;
use Illuminate\Support\Facades\Mail;
use App\Notifications\ApplicationSubmitted;
use App\Models\Submission;
use App\Models\BoardJob;
use App\Models\Company;
use App\Models\User;
use App\Models\Notification;
use Carbon\Carbon;
use Redis;

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
                'company_id' => $request->company_id,
                'email' => auth()->user()->email,
                'phone_number' => ' ',
                'country' => 'pakistan',
                'resume' => 'dummy file',
                'state' => 'kpk',
                'ability_to_commute' => 'yes',
                'salary_expectation' => '40000',
                'notice_period' => '14',
                'schedule_interview' => Carbon::now(),
                'accept_candidate' => -1
            ]);
        }
    	

    	return response()->json([
    		'submission' => $submission
    	]);
    }
    public function saveData(Request $request, $candidate_id, $board_job_id, ConfirmApplication $confirm) {


        $company_id = BoardJob::find($board_job_id)->company_id;
        $company_user_id = Company::find($company_id)->user_id;
        $resume = null;


        // return \App\Models\User::find($company_user_id)->recruiter_of;

        if($request->file('resume')){
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
        		'resume' => $request->file('resume') ? $resume : $submission->resume,
                'accept_candidate' => -1,
                'company_id' => $company_id,
        		'state' => $request->has('state') ? $request->state : $submission->state,
        		'ability_to_commute' => $request->has('ability_to_commute') ? $request->ability_to_commute : $submission->ability_to_commute,
        		'salary_expectation' => $request->has('salary_expectation') ? $request->salary_expectation : $submission->salary_expectation,
        		'notice_period' => $request->has('notice_period') ? $request->notice_period : $submission->notice_period,
            'schedule_interview' => $request->has('schedule_interview') ? $request->schedule_interview : Carbon::parse($submission->schedule_interview)
        	]
        );
            


        if($request->has('country')) {
            
            // return \App\Models\User::find($company_user_id);
            \App\Models\User::find($company_user_id)->notify(new ApplicationSubmitted(auth()->user(), ''));
                 // event(new \App\Events\StatusLiked(auth()->user()->name));     
            // }
           

            // Mail::to('test@jfdk.com')->send(new ConfirmApplication(auth()->user(), BoardJob::find($board_job_id)) ); 
            // Mail::to('shabeeulhassan40@gmail.com')->send(new SendResume(auth()->user(), BoardJob::find($board_job_id), public_path('uploads\\' .$submission->resume)));
             // Mail::to('fjdkfj@kjdf.com')->queue(new SendResume(auth()->user(), BoardJob::find($board_job_id), public_path('uploads\\' .$submission->resume)));



             // Mail::to('fjdkfj@kjdf.com')->queue(new SendResume(auth()->user(), BoardJob::find($board_job_id), public_path('uploads\\' .$submission->resume)));
        }
       
     
        return response()->json([
         "submission" => $submission
        ]);
    }

    public function getSubmissions() {
        // return Submission::with(['boardJob'])->where("company_id", auth()->user()->company->id)->get();
        $company_id = auth()->user()->company ? auth()->user()->company->id : null;

        // $company_id = auth()->user()->company->id;
        // $submissions = Submission::where("company_id", $company_id)
        //                         ->get();


        $submissions = Submission::with(['boardJob'])
                                ->where("company_id", $company_id)
                                ->paginate(10);
        if(!$company_id) {
            $submissions = Submission::with(['boardJob', 'company'])
                                    ->where('user_id', auth()->user()->id)
                                    ->paginate(10);
        }


        return response()->json([
            "submissions" => $submissions,
            "role" => auth()->user()->role
        ]);
    }

    public function acceptCandidate(Request $request, $submissionId) {

        $submission = Submission::find($submissionId);
        if(!$submission) {
            return;
        }

        if($submission) {
            $submission->update([
                'accept_candidate' => 1
            ]);
        }

        $submission->boardJob->delete();

        $feedback = [
            'message' => 'Congratulation! You have been selected',
            'accepted' => $submission->accepted_candidate
        ];


        // if($submission->user_id != $request->user_id) {

            $submissions = Submission::where('board_job_id', $submission->board_job_id)
                                    ->where('id', '!=', $submission->id)
                                    ->update([
                                        'accept_candidate' => 2
                                    ]);
            foreach($request->rejectedSubmissions as $rejectedSubmission) {
                $details = [
                    'user_id' => $rejectedSubmission['user_id'],
                    'message' => "Unfortunately you have not been selected for {$rejectedSubmission['board_job']['title']} role. Good luck for future"
                ];

                $feedback = [
                    'message' => 'Unfortunately you have not been selected for this role. Good luck for future',
                    'accepted' => false
                ];

                event(new \App\Events\MessageEvent(auth()->user(), $details));  
            }

            $notification= Notification::create([
                'user_id' => $rejectedSubmission['user_id'],
                'message' => [
                    'accepted' => false,
                    'description' => 'You have rejected for the job {$rejectedSubmission["board_job"]["title"]}'
                ]
            ]);
        // }
        

        event(new \App\Events\MessageEvent(auth()->user(), $request));

        $notification = Notification::create([
                'user_id' => $request->user_id,
                'message' => [
                    'accepted' => true,
                    'description' => 'You have accepted for the job'
                ]
            ]);
         
        return response()->json([
            "message" => "Congratulation! You have been selected",
            "accepted" => $submission->accept_candidate
        ]); 
    }
}
