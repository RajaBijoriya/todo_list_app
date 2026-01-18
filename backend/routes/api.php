<?php
Route::get('/ping', function () {
    return response()->json(['status' => 'API working']);
});

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

Route::get('/todos', [Controller::class, 'index']);
Route::post('/todos', [Controller::class, 'store']);
Route::get('/todos/{id}', [Controller::class, 'show']);
Route::put('/todos/{id}', [Controller::class, 'update']);
Route::delete('/todos/{id}', [Controller::class, 'destroy']);


?>