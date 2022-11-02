<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sprint extends Model
{
    use HasFactory;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'nrh_sprints';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'responsible',
        'createdBy',
        'estimationBeginAt',
        'estimationEndAt',
        'estimationDuration',
        'beginAt',
        'endAt',
        'duration',
        'status',
        'project_id'
    ];
}
