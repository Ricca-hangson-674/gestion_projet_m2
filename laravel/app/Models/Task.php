<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'nrh_tasks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'pointStory',
        'responsible',
        'createdBy',
        'estimationBeginAt',
        'estimationEndAt',
        'estimationDuration',
        'beginAt',
        'endAt',
        'duration',

        'project_id',
        'backlog_id',
        'sprint_id',
        'column_id'
    ];
}
