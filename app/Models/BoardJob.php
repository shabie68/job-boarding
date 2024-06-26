<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoardJob extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function skills() {
    	return $this->hasMany(Skill::class);
    }
}

