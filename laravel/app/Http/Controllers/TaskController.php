<?php

namespace App\Http\Controllers;

use App\Models\Affectation;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $data = $request->all();
        $data['createdBy'] = Auth::id();
        $data['project_id'] = $request->session()->get('projectSelected')->id;
        $data['backlog_id'] = $request->session()->get('backlogSelected')->id;

        # 2022-11-03 15:58:36

        $dateDebut = new \DateTime(date('Y-m-d', strtotime($request->beginAt)));
        $dateFin = new \DateTime(date('Y-m-d', strtotime($request->endAt)));

        $data['duration'] = $dateFin->diff($dateDebut)->days;
        
        Task::create($data);

        return Redirect::back()->with('message', 'Task created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        //
    }

    /**
     * affectation
     *
     * @param Type|null $var
     * @return void
     */
    public function affectation(Request $request)
    {

        foreach ($request->affectations as $affectation) {
            var_dump($affectation);
        }
        dd($request->all());

        # Affectation::where('task_id', $request->task)->delete();

        return Redirect::back()->with('message', 'Task affeted.');
    }
}
