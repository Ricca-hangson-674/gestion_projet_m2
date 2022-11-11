<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    use HasFactory;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'nrh_columns';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
    ];

    /**
     * Get the tasks that owns the sprint.
     */
    public function tasks()
    {
        # related, foreignKey, ownerKey
        return $this->hasMany(Task::class, 'column_id', 'id')->where('nrh_tasks.project_id', session()->get('projectSelected')->id);;
    }
}
