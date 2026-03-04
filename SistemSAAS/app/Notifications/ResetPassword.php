<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Config;

class ResetPassword extends ResetPasswordNotification
{
    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        // Generate frontend reset URL for SPA
        $frontendUrl = env('FRONTEND_URL', 'http://localhost:5173');
        $resetUrl = $frontendUrl . "/reset-password/{$this->token}?email=" . urlencode($notifiable->email);

        return (new MailMessage)
            ->subject('Reset Password - Sistem SaaS Magang')
            ->markdown('emails.reset-password-notification', [
                'action_url' => $resetUrl,
                'action_text' => 'Reset Password',
                'user_name' => $notifiable->name,
                'reset_url' => $resetUrl,
            ]);
    }
}
