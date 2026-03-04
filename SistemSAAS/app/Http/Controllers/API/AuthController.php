<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
        ]);

        // Create Company
        $company = Company::create([
            'name' => $request->company_name,
            'slug' => Str::slug($request->company_name) . '-' . Str::random(5),
            'email' => $request->email,
        ]);

        // Create User linked to Company
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'company_id' => $company->id,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user->load('company'),
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Find user by name (username) field
        $user = User::where('name', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Username atau password salah'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // For development: bypass throttle by clearing reset tokens (if table exists)
        if (app()->environment('local')) {
            try {
                if (\Schema::hasTable('password_reset_tokens')) {
                    \DB::table('password_reset_tokens')->where('email', $request->email)->delete();
                }
            } catch (\Exception $e) {
                \Log::debug('Could not clear password reset tokens', ['error' => $e->getMessage()]);
            }
        }

        $status = Password::sendResetLink($request->only('email'));

        // Always return a generic success message to avoid email enumeration
        $message = 'Jika email terdaftar, link reset password telah dikirim. Silakan cek inbox/spam.';

        if ($status !== Password::RESET_LINK_SENT) {
            // Log internally WITHOUT exposing email in error response
            \Log::warning('Password reset link not sent', [
                'status' => $status,
                'user_count' => \App\Models\User::where('email', $request->email)->count()
            ]);
        }

        return response()->json(['message' => $message, 'success' => $status === Password::RESET_LINK_SENT], 200);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
            'token' => 'required|string',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password berhasil direset. Silakan login.', 'success' => true], 200);
        }

        return response()->json(['message' => 'Token tidak valid atau sudah kadaluarsa.', 'success' => false], 422);
    }}
