@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
# Reset Password Anda
@endif

{{-- Intro Lines --}}
Halo @if($user_name) {{ $user_name }} @else Pengguna @endif,

Kami menerima permintaan untuk mereset password akun Anda. Klik tombol di bawah untuk membuat password baru.

{{-- Action Button --}}
@component('mail::button', ['url' => $reset_url, 'color' => 'primary'])
{{ $action_text ?? 'Reset Password' }}
@endcomponent

{{-- Info --}}
**Informasi Penting:**
- Link ini hanya berlaku selama 60 menit
- Jika Anda tidak meminta reset password, abaikan email ini
- Link ini hanya bisa digunakan sekali

Atau salin dan paste URL ini ke browser Anda:
{{ $reset_url }}

---

Jika Anda mengalami masalah, hubungi tim support kami di support@sistemsaas.local

Salam,
**Tim Sistem SaaS Magang**
@endcomponent
