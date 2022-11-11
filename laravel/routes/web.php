<?php

use App\Http\Controllers\BacklogController;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\SprintController;
use App\Http\Controllers\TaskBoardController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';

Route::get('/example', function () {
    return Inertia::render('Example/Index');
})->middleware(['auth', 'verified'])->name('example');


// Administration
Route::prefix('admin')
    ->middleware('auth')
    # ->namespace('Back')
    ->group(function () {
        Route::resource('project', ProjectController::class);
        Route::resource('sprint', SprintController::class);
        Route::resource('task', TaskController::class);
        Route::resource('backlog', BacklogController::class);
        Route::resource('column', ColumnController::class);

        Route::name('selectProjet')->get('selectProjet/{project}', [ProjectController::class, 'selectProjet']);
        Route::name('chart')->get('chart', [ChartController::class, 'index']);
        Route::name('roadmap')->get('roadmap', [RoadmapController::class, 'index']);
        Route::name('taskboard')->get('taskboard', [TaskBoardController::class, 'index']);
        Route::name('task.affectations')->post('affectations', [TaskController::class, 'affectation']);
        Route::name('sprint.start')->post('sprint-start', [SprintController::class, 'start']);
    });
