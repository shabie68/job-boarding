<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    
    public function show() {

    	$companies = Company::paginate(12);

    	return response()->json([
    		"companies" => $companies,
            "role" => auth()->user()->role
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

        return response()->json([
            "company" => $company
        ]);
    }

    public function addReview(Request $request, $id) {
        $company = Company::find($id);

        $company->update([
            "feedback" => $request->feedback
        ]);

        return response()->json([
            "company" => $company
        ]);
    }
}
