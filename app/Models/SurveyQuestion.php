<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    protected $fillable = [
        'question',
        'data',
        'type',
        'survey_id',
        'desciption'
    ];
    use HasFactory;
}
