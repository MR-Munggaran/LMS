<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // GET /users → hanya admin
    public function index(Request $request)
    {
        if ($request->user()->role->name !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $users = User::with('role')->latest()->paginate(10);
        return UserResource::collection($users);
    }

    // GET /users/{id} → hanya admin
    public function show(Request $request, $id)
    {
        if ($request->user()->role->name !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $user = User::with('role')->findOrFail($id);
        return new UserResource($user);
    }

    // POST /users → hanya admin
    public function store(Request $request)
    {
        if ($request->user()->role->name !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'name'            => 'required|string|max:255',
            'email'           => 'required|email|unique:users',
            'password'        => 'required|string|min:6|confirmed',
            'role_id'         => 'required|exists:roles,id',
            'jenjang_sekolah' => 'nullable|string|max:100',
            'asal_sekolah'    => 'nullable|string|max:255',
            'avatar'          => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = new User();
        $user->name            = $validated['name'];
        $user->email           = $validated['email'];
        $user->password        = Hash::make($validated['password']);
        $user->role_id         = $validated['role_id'];
        $user->jenjang_sekolah = $validated['jenjang_sekolah'] ?? null;
        $user->asal_sekolah    = $validated['asal_sekolah'] ?? null;

        if ($request->hasFile('avatar')) {
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        }

        $user->save();

        return new UserResource($user->load('role'));
    }

    // sudah ada: me()
    public function me(Request $request)
    {
        return new UserResource($request->user()->load('role'));
    }

    // sudah ada: update()
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // hanya owner atau admin
        if ($request->user()->id !== $user->id && $request->user()->role->name !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'name'            => 'sometimes|string|max:255',
            'email'           => 'sometimes|email|unique:users,email,' . $user->id,
            'password'        => 'sometimes|string|min:6|confirmed',
            'role_id'         => 'sometimes|exists:roles,id',
            'jenjang_sekolah' => 'nullable|string|max:100',
            'asal_sekolah'    => 'nullable|string|max:255',
            'avatar'          => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $emailChanged    = isset($validated['email']) && $validated['email'] !== $user->email;
        $passwordChanged = !empty($validated['password']);

        $user->fill([
            'name'            => $validated['name'] ?? $user->name,
            'email'           => $validated['email'] ?? $user->email,
            'jenjang_sekolah' => $validated['jenjang_sekolah'] ?? $user->jenjang_sekolah,
            'asal_sekolah'    => $validated['asal_sekolah'] ?? $user->asal_sekolah,
        ]);

        if (isset($validated['role_id']) && $request->user()->role->name === 'admin') {
            $user->role_id = $validated['role_id'];
        }

        if ($passwordChanged) {
            $user->password = Hash::make($validated['password']);
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        }

        $user->save();

        if ($emailChanged || $passwordChanged) {
            $request->user()->tokens()->delete();
            $newToken = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'token' => $newToken,
                'user'  => new UserResource($user->load('role')),
            ]);
        }

        return new UserResource($user->load('role'));
    }

    // sudah ada: destroy()
    public function destroy(Request $request, $id)
    {
        if ($request->user()->role->name !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $user = User::findOrFail($id);

        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->delete();

        return response()->json(['message' => 'User berhasil dihapus']);
    }
}
