<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255|exists:users|email:rfc,dns|regex:/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/i',
            'password' => 'required|string|min:4|max:255',
        ]);

        $user = User::where('email', $request['email'])->first();

        if (! $user || ! Hash::check($request['password'], $user->password)) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'Name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users|email:rfc,dns|regex:/^.+@.+$/i',
            'password' => 'required|string|min:4|max:255|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        ]);

        $user = User::create([
            'Name' => $validatedData['Name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(["message" => "Logout."]);
    }

    public function delete(Request $request)
    {
        $request->user()->delete();

        return response()->json([
            'message' => 'User deleted',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function UpdatePassword(Request $request)
    {
        $validatedData = $request->validate([
            'password' => 'required|string|min:4|max:255|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            'email' => 'required|string',
        ]);

        $user = User::where('email', $request['email'])->firstOrFail();

        $user->update([
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->json([
            'message' => 'Password updated',
        ]);
    }

    public function UpdateEmail(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255|unique:users|email:rfc,dns|regex:/^.+@.+$/i',
        ]);

        $user = User::where('email', $request['email'])->firstOrFail();

        $user->update([
            'email' => $validatedData['email'],
        ]);

        return response()->json([
            'message' => 'Email updated',
        ]);
    }
}
