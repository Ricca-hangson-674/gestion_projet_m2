<?php

namespace App\Http\Controllers;

use App\Models\Backlog;
use App\Models\Sprint;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BacklogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $attributions = Task::find(1)->attributions()->orderBy('created_at')->get();
        // dd($attributions);

        $sprints = Sprint::latest('created_at')->get()->transform(function ($sprint) {
            return [
                'id' => $sprint->id,
                'status' => $sprint->status,
                'name' => $sprint->name,
                'description' => $sprint->description,
                'responsible' => $sprint->responsibleUser->firstname,
                'createdBy' => $sprint->createdByUser->firstname,
                'estimationBeginAt' => nrh_dateTime($sprint->estimationBeginAt),
                'estimationEndAt' => nrh_dateTime($sprint->estimationEndAt),
                'beginAt' => nrh_dateTime($sprint->beginAt),
                'endAt' => nrh_dateTime($sprint->endAt),
                'created_at' => nrh_dateTime($sprint->created_at),

            ];
        });
        $tasks = Task::latest('created_at')->get()->transform(function ($task) {
            return [
                'id' => $task->id,
                'name' => $task->name,
                'description' => $task->description,
                'responsible' => $task->responsibleUser->firstname,
                'createdBy' => $task->createdByUser->firstname,
                'estimationBeginAt' => nrh_dateTime($task->estimationBeginAt),
                'estimationEndAt' => nrh_dateTime($task->estimationEndAt),
                'beginAt' => nrh_dateTime($task->beginAt),
                'endAt' => nrh_dateTime($task->endAt),
                'created_at' => nrh_dateTime($task->created_at),
                'attributionsOptions' => $task->attributions()->orderBy('created_at')->get()->transform(function ($attribution) {
                    return [
                        "value" => $attribution->id, 
                        "label" => "{$attribution->firstname} {$attribution->lastname}" 
                    ];
                }),
                'attributions' => $task->attributions()->orderBy('created_at')->get(),
            ];
        });
        $options = User::all()->transform(function ($user) {
            return [
                "value" => $user->id, 
                "label" => "{$user->firstname} {$user->lastname}" 
            ];
        });
        $users = User::all();
        return Inertia::render('Backlog/Index', [
            'tasks' => $tasks,
            'users' => $users,
            'sprints' => $sprints,
            'options' => $options,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Backlog  $backlog
     * @return \Illuminate\Http\Response
     */
    public function show(Backlog $backlog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Backlog  $backlog
     * @return \Illuminate\Http\Response
     */
    public function edit(Backlog $backlog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Backlog  $backlog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Backlog $backlog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Backlog  $backlog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Backlog $backlog)
    {
        //
    }
}
