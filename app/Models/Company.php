<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
    	'contact_information' => 'array',
        'feedback' => 'array'
    ];

    public function user() {
    	return $this->belongsTo(User::class);
    }

    public function submissions() {
    	return $this->hasMany(Submission::class);
    }

    public function boardJobs() {
        return $this->hasMany(BoardJob::class);
    }

}
