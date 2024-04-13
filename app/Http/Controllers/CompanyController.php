<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;

class CompanyController extends Controller
{
    
    public function show() {

    	$companies = Company::all();

    	return response()->json([
    		"companies" => $companies
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

            "logo" => $logo,
    		"title" => $request->title,
            "logo" => 'testing.png',
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
}
