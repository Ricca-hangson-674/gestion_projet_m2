<?php

namespace App\Http\Controllers;

use App\Models\Sprint;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class SprintController extends Controller
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
        $data['status'] = 'EN COURS';
        $data['project_id'] = $request->session()->get('projectSelected')->id;

        $dateDebut = new \DateTime(date('Y-m-d', strtotime($request->beginAt)));
        $dateFin = new \DateTime(date('Y-m-d', strtotime($request->endAt)));
        $data['duration'] = $dateFin->diff($dateDebut)->days;

        Sprint::create($data);

        return Redirect::back()->with('message', 'Sprint created.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sprint  $sprint
     * @return \Illuminate\Http\Response
     */
    public function show(Sprint $sprint)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sprint  $sprint
     * @return \Illuminate\Http\Response
     */
    public function edit(Sprint $sprint)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sprint  $sprint
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sprint $sprint)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sprint  $sprint
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sprint $sprint)
    {
        //
    }

    /**
     * Start sprint
     *
     * @param Type|null $var
     * @return void
     */
    public function start(Request $request)
    {
        $sprint = Sprint::find($request->sprint);
        $sprint->status = 'PRET';
        $sprint->save();

        return Redirect::back()->with('message', 'Sprint start.');
    }
}
