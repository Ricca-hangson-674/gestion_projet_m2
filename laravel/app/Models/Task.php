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


    /**
     * Get the responsibleUser that owns the task.
     */
    public function responsibleUser()
    {
        # related, foreignKey, ownerKey
        return $this->belongsTo(User::class, 'responsible', 'id');
    }

    /**
     * Get the createdByUser that owns the task.
     */
    public function createdByUser()
    {
        # related, foreignKey, ownerKey
        return $this->belongsTo(User::class, 'createdBy', 'id');
    }

    /**
     * Get attributions
     *
     * @return void
     */
    public function attributions()
    {
        # return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
        return $this->belongsToMany(User::class, 'nrh_affectations', 'task_id', 'user_id');
    }
}
