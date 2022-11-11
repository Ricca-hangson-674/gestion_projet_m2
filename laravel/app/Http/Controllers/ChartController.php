<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $labelsUpchart = [];
        $datasUpchart = [];
        $labelsDownchart = [];
        $datasDownchart = [];

        $start = nrh_chart($request->session()->get('projectSelected')->beginAt);

        $storyPoint = DB::table('nrh_tasks')->selectRaw('SUM(nrh_tasks.pointStory) as pointStory')
                        ->where('project_id', $request->session()->get('projectSelected')->id)
                        ->first()->pointStory;

        $tasks = Task::where('project_id', $request->session()->get('projectSelected')->id)
            ->latest('created_at')->get()->transform(function ($task) {
                return [
                    'pointStory' => $task->pointStory,
                    'date' => nrh_chart($task->endAt),
                ];
            }
        );

        $initalUpChart = 0;
        $labelsUpchart[] = $start;
        $datasUpchart[] = $initalUpChart ;

        foreach ($tasks as $task) {
            $labelsUpchart[] = $task['date'];
            $initalUpChart += $task['pointStory'];
            $datasUpchart[] = $initalUpChart;
        }

        $initalDownChart = intval($storyPoint);
        $labelsDownchart[] = $start;
        $datasDownchart[] = $initalDownChart ;

        foreach ($tasks as $task) {
            $labelsDownchart[] = $task['date'];

            $initalDownChart -= $task['pointStory'];
            $datasDownchart[] = $initalDownChart;
        }

        return Inertia::render('Chart/Index', [
            'labelsUpchart' => $labelsUpchart,
            'labelsDownchart' => $labelsDownchart,
            'datasUpchart' => $datasUpchart,
            'datasDownchart' => $datasDownchart,
        ]);
    }
}
