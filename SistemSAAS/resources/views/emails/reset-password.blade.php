@component('mail::message')
# Reset Password Anda

Halo @if($userName) {{ $userName }} @else Pengguna @endif,

Kami menerima permintaan untuk mereset password akun Anda. Klik tombol di bawah untuk membuat password baru.

@component('mail::button', ['url' => $resetUrl, 'color' => 'primary'])
Reset Password
@endcomponent

**Informasi Penting:**
- Link ini hanya berlaku selama 60 menit
- Jika Anda tidak meminta reset password, abaikan email ini
- Link ini hanya bisa digunakan sekali

Atau salin dan paste URL ini ke browser Anda:
{{ $resetUrl }}

---

Jika Anda mengalami masalah, hubungi tim support kami.

Salam,<br>
**Tim Sistem SaaS Magang**
@endcomponent
