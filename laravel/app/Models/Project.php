<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'nrh_projects';

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
        'beginAt',
        'endAt',
    ];

    /**
     * Get the responsibleUser that owns the project.
     */
    public function responsibleUser()
    {
        # related, foreignKey, ownerKey
        return $this->belongsTo(User::class, 'responsible', 'id');
    }

    /**
     * Get the createdByUser that owns the project.
     */
    public function createdByUser()
    {
        # related, foreignKey, ownerKey
        return $this->belongsTo(User::class, 'createdBy', 'id');
    }


}
