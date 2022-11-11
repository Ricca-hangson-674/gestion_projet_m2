<?php

namespace App\Http\Controllers;

use App\Models\Column;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskBoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $columns = Column::all()->transform(function ($column) {

            return [
                'id' => $column->id,
                'name' => $column->name,
                'tasks' => $column->tasks,
            ];
        });
        return Inertia::render('TaskBoard/Index', [
            'columns' => $columns
        ]);
    }
}
