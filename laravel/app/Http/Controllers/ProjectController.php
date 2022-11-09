<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::latest('created_at')->get()->transform(function ($project) {
            return [
                'id' => $project->id,
                'name' => $project->name,
                'description' => $project->description,
                'responsible' => $project->responsibleUser->firstname,
                'createdBy' => $project->createdByUser->firstname,
                'estimationBeginAt' => nrh_dateTime($project->estimationBeginAt),
                'estimationEndAt' => nrh_dateTime($project->estimationEndAt),
                'beginAt' => nrh_dateTime($project->beginAt),
                'endAt' => nrh_dateTime($project->endAt),
                'created_at' => nrh_dateTime($project->created_at),
            ];
        });

        $users = User::all();

        return Inertia::render('Project/Index', [
            'projects' => $projects,
            'users' => $users
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
        $data = $request->all();
        $data['createdBy'] = Auth::id();
        Project::create($data);

        return Redirect::back()->with('message', 'Project created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        return response()->json([
            'id' => $project->id,
            'name' => $project->name,
            'description' => $project->description,
            'responsible' => $project->responsibleUser->firstname,
            'createdBy' => $project->createdByUser->firstname,
            'estimationBeginAt' => nrh_dateTime($project->estimationBeginAt),
            'estimationEndAt' => nrh_dateTime($project->estimationEndAt),
            'beginAt' => nrh_dateTime($project->beginAt),
            'endAt' => nrh_dateTime($project->endAt),
            'created_at' => nrh_dateTime($project->created_at),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        //
    }
}
