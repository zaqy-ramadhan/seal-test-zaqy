<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class EmployeesController extends Controller
{
    // Menampilkan daftar karyawan
    public function index(Request $request)
    {
        $query = Employee::with('division'); // Eager load the division relationship
    
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }
    
        if ($request->has('division_id')) {
            $query->where('division_id', $request->input('division_id'));
        }
    
        $employees = $query->paginate(10);
    
        return response()->json([
            'status' => 'success',
            'message' => 'Data retrieved successfully',
            'data' => [
                'employees' => $employees->items(),
            ],
            'pagination' => [
                'total' => $employees->total(),
                'current_page' => $employees->currentPage(),
                'per_page' => $employees->perPage(),
                'last_page' => $employees->lastPage(),
                'next_page_url' => $employees->nextPageUrl(),
                'prev_page_url' => $employees->previousPageUrl(),
            ],
        ]);
    }
    

    // Menambahkan data karyawan
    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'division' => 'required|exists:divisions,id',
            'position' => 'required|string|max:255',
        ]);

        $imagePath = $request->file('image')->store('images', 'public');

        Employee::create([
            'image' => $imagePath,
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'division_id' => $request->input('division'),
            'position' => $request->input('position'),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Employee created successfully',
        ]);
    }

    // Menampilkan detail karyawan
    public function show($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Employee not found',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data retrieved successfully',
            'data' => [
                'employee' => $employee,
            ],
        ]);
    }

    // Mengupdate data karyawan
    public function update(Request $request, $id)
{
    // Validate the request
    $request->validate([
        'image' => 'nullable|file|mimes:jpeg,png,jpg|max:2048',
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'division' => 'required|exists:divisions,id',
        'position' => 'required|string|max:255',
    ]);

    // Find the employee by ID
    $employee = Employee::findOrFail($id);
    // dd($request->name);

    // Handle the image file upload if it exists
    if ($request->hasFile('image')) {
        // Delete old image if it exists
        if ($employee->image) {
            Storage::disk('public')->delete($employee->image);
        }

        // Store the new image
        $imagePath = $request->file('image')->store('images', 'public');
        $employee->image = $imagePath;
    }

    // Update employee details
    $employee->name = $request->input('name');
    $employee->phone = $request->input('phone');
    $employee->division_id = $request->input('division');
    $employee->position = $request->input('position');
    $employee->save();

    return response()->json([
        'status' => 'success',
        'message' => 'Employee updated successfully',
    ]);
}


    // Menghapus data karyawan
    public function destroy($id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()->json([
                'status' => 'error',
                'message' => 'Employee not found',
            ], 404);
        }

        // Hapus gambar jika ada
        if ($employee->image) {
            Storage::disk('public')->delete($employee->image);
        }

        $employee->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Employee deleted successfully',
        ]);
    }
}

