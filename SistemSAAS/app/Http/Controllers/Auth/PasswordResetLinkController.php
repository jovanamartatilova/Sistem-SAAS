<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Password;

class PasswordResetLinkController extends Controller
{
    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        // Send the password reset link, but don't reveal whether the email exists
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // we always return 200 so that attackers cannot enumerate emails
        $message = 'Jika email terdaftar, link reset password telah dikirim. Silakan cek inbox/spam.';

        // you may log failures for debugging
        if ($status !== Password::RESET_LINK_SENT) {
            \Log::warning('Password reset link not sent', ['email' => $request->email, 'status' => $status]);
        }

        return response()->json([
            'message' => $message,
            'success' => $status === Password::RESET_LINK_SENT,
        ], 200);
    }
}
