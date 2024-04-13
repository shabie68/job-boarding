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

    	$company = Company::create([

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
