<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'phone_number', 'email', 'state', 'resume', 'salary_expectation', 'ability_to_commute', 'schedule_interview', 'experience', 'notice_period'];
}
