<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $baseQuery = Todo::where('user_id', auth()->id());

        $total    = (clone $baseQuery)->count();
        $finished = (clone $baseQuery)->where('is_finished', true)->count();
        $pending  = $total - $finished;

        $perDay = (clone $baseQuery)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $query = (clone $baseQuery);

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                    ->orWhere('description', 'like', '%' . $search . '%');
            });
        }

        $status = $request->query('status');
        if ($status === 'finished') {
            $query->where('is_finished', true);
        } elseif ($status === 'pending') {
            $query->where('is_finished', false);
        }

        $todos = $query
            ->orderBy('created_at', 'desc')
            ->paginate(20)
            ->withQueryString()
            ->through(function (Todo $todo) {
                return [
                    'id'          => $todo->id,
                    'title'       => $todo->title,
                    'description' => $todo->description,
                    'is_finished' => $todo->is_finished,
                    'cover'       => $todo->cover,
                    'cover_url'   => $todo->cover
                        ? asset('storage/' . $todo->cover)
                        : null,
                    'created_at'  => $todo->created_at->toDateTimeString(),
                ];
            });

        return Inertia::render('app/Todos', [
            'todos'   => $todos,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
            'stats' => [
                'total'    => $total,
                'finished' => $finished,
                'pending'  => $pending,
                'per_day'  => $perDay,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('app/TodoCreate');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover'       => 'nullable|image|max:2048',
        ]);

        $coverPath = null;
        if ($request->hasFile('cover')) {
            $coverPath = $request->file('cover')->store('covers', 'public');
        }

        Todo::create([
            'user_id'     => auth()->id(),
            'title'       => $request->title,
            'description' => $request->description,
            'cover'       => $coverPath,
            'is_finished' => false,
        ]);

        return redirect()
            ->route('todos.index')
            ->with('success', 'Todo berhasil ditambahkan.');
    }

    public function update(Request $request, Todo $todo)
    {
        $this->authorizeTodoOwner($todo);

        $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover'       => 'nullable|image|max:2048',
        ]);

        $data = [
            'title'       => $request->title,
            'description' => $request->description,
        ];

        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('covers', 'public');
        }

        $todo->update($data);

        return redirect()
            ->back()
            ->with('success', 'Todo berhasil diupdate.');
    }

    public function toggle(Todo $todo)
    {
        $this->authorizeTodoOwner($todo);

        $todo->update([
            'is_finished' => ! $todo->is_finished,
        ]);

        return redirect()
            ->back()
            ->with('success', 'Status todo berhasil diubah.');
    }

    public function destroy(Todo $todo)
    {
        $this->authorizeTodoOwner($todo);

        $todo->delete();

        return redirect()
            ->back()
            ->with('success', 'Todo berhasil dihapus.');
    }

    private function authorizeTodoOwner(Todo $todo)
    {
        if ($todo->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
    }
}
