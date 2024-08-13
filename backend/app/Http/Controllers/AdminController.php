<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AdminController extends Controller
{
    public function show()
    {
        return response()->json(Auth::user());
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255',
        ]);
    
        try {
            $admin = User::find($id);
            if (!$admin) {
                return response()->json(['error' => 'No admin found'], 404);
            }
    
            $admin->name = $request->input('name');
            $admin->email = $request->input('email');
            $admin->save();
    
            return response()->json($admin);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
