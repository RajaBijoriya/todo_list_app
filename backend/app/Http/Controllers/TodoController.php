<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return response()->json(Todo::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string'
        ]);

        return Todo::create([
            'title' => $request->title,
            'completed' => false
        ]);
    }

    public function show($id)
    {
        return Todo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $todo->update($request->all());
        return $todo;
    }

    public function destroy($id)
    {
        Todo::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}
