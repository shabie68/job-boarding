<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;

class CompanyController extends Controller
{
    
    public function show() {

    	$companies = Company::paginate(6);

    	return response()->json([
    		"companies" => $companies,
            "user" => auth()->user(),
            "role" => auth()->user()->role,
    	]);
    }

    public function store(Request $request) {

        $logo = null;

        if($request->file('logo')) {
            $destinationPath = 'uploads\images';
            $logo = $request->file('logo')->getClientOriginalName();
            $request->file('logo')->move(public_path($destinationPath), $logo);  
             
        }

    	$company = Company::create([
            "user_id" => auth()->user()->id,
            "logo" => $logo,
    		"title" => $request->title,
    		"description" => $request->description,
    		"locations" => $request->locations,
    		"total_employees" => $request->total_employees,
    		"website" => $request->website_url,
    		"contact_information" => $request->contact_information,
    		"industry" => $request->industry
    	]);

       
        $user = User::find(auth()->user()->id);
        $user->recruiter_of = auth()->user()->name . '-' . $company->title;
        $user->save();

// 
        // auth()->user()->recruiter_of = auth()->user()->name . '-' . $company->title;

        return response()->json([
            "company" => $company,
            "user" => auth()->user()
        ]);
    }

    public function addReview(Request $request, $id) {
       
        $company = Company::find($id);

        $feedback = $company->feedback;

        if(!$feedback) {
            $feedback = [];
        }
        
        $feedback[] = $request->feedback;


        $company->update([
            "feedback" => $feedback
        ]);

        return response()->json([
            "company" => $company,
        ]);
    }
}
