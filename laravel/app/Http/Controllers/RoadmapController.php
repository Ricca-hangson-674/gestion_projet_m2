<?php

namespace App\Http\Controllers;

use App\Models\Sprint;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoadmapController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $events = [];
        $project = [
            'title' => $request->session()->get('projectSelected')->name,
            'start' => nrh_calendar($request->session()->get('projectSelected')->beginAt),
            'end' => nrh_calendar($request->session()->get('projectSelected')->endAt),
        ];

        $sprints = Sprint::where('project_id', $request->session()->get('projectSelected')->id)
            ->latest('created_at')->get()->transform(function ($sprint) {
                return [
                    'title' => $sprint->name,
                    'start' => nrh_calendar($sprint->beginAt),
                    'end' => nrh_calendar($sprint->beginAt),
                ];
            }
        );

        $tasks = Task::where('project_id', $request->session()->get('projectSelected')->id)
            ->latest('created_at')->get()->transform(function ($task) {
                return [
                    'title' => $task->name,
                    'start' => nrh_calendar($task->beginAt),
                    'end' => nrh_calendar($task->beginAt),
                ];
            }
        );

        $events[] = $project;

        if (count($tasks)) {
            foreach ($tasks as $value) {
                $events[] = $value;
            }
        }

        if (count($sprints)) {
            foreach ($sprints as $value) {
                $events[] = $value;
            }
        }

        return Inertia::render('Roadmap/Index', [
            'events' => $events,
        ]);
    }
}
