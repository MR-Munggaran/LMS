<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Profil user login
     */
    public function me(Request $request)
    {
        return new UserResource($request->user()->load('role'));
    }

    /**
     * Update user
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // hanya owner atau admin yang bisa update
        if ($request->user()->id !== $user->id && $request->user()->role->name !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $request->validate([
            'name'     => 'sometimes|string|max:255',
            'password' => 'sometimes|string|min:6|confirmed',
            'face_data' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->filled('name')) {
            $user->name = $request->name;
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->hasFile('face_data')) {
            $user->face_data_path = $request->file('face_data')->store('faces', 'public');
        }

        $user->save();

        return new UserResource($user);
    }

    /**
     * Hapus user (admin only)
     */
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role->name !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User berhasil dihapus']);
    }
}
