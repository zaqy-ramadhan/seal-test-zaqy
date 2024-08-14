<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    // Index (Menampilkan semua tugas)
    public function index()
    {
        $tasks = Task::all();
        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ]);
    }

    // Show (Menampilkan detail tugas berdasarkan ID)
    public function show($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['status' => 'error', 'message' => 'Task not found'], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $task
        ]);
    }

    // Store (Membuat tugas baru)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
            'due_date' => 'nullable|date',
            'status' => 'required|string|in:pending,in_progress,completed',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Handle file upload
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('task_files', 'public');
        }

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'project_id' => $request->project_id,
            'user_id' => $request->user_id,
            'due_date' => $request->due_date,
            'status' => $request->status,
            'file' => $filePath,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Task created successfully',
            'data' => $task
        ], 201);
    }

    // Update (Memperbarui tugas berdasarkan ID)
    public function update(Request $request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['status' => 'error', 'message' => 'Task not found'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
            'due_date' => 'nullable|date',
            'status' => 'required|string|in:pending,in_progress,completed',
            'file' => 'nullable|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Handle file upload
        if ($request->hasFile('file')) {
            // Hapus file lama jika ada
            if ($task->file_path) {
                Storage::disk('public')->delete($task->file_path);
            }
            $filePath = $request->file('file')->store('task_files', 'public');
            $task->file = $filePath;
        }

        $task->update($request->only([
            'title', 'description', 'project_id', 'user_id', 'due_date', 'status', 'file_path'
        ]));

        return response()->json([
            'status' => 'success',
            'message' => 'Task updated successfully',
            'data' => $task
        ]);
    }

    // Destroy (Menghapus tugas berdasarkan ID)
    public function destroy($id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json(['status' => 'error', 'message' => 'Task not found'], 404);
        }

        // Hapus file jika ada
        if ($task->file_path) {
            Storage::disk('public')->delete($task->file_path);
        }

        $task->delete();

        return response()->json(['status' => 'success', 'message' => 'Task deleted successfully']);
    }
}
