<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BoardJob extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];


    public function skills() {
    	return $this->hasMany(Skill::class);
    }

    public function submissions() {
    	return $this->hasMany(Submission::class);
    }

    public function company() {
    	return $this->belongsTo(Company::class);
    }

}

