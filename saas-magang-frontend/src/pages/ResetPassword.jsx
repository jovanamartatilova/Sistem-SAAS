import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams, useSearchParams } from 'react-router-dom';
import api from '../lib/api';

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
);

const ResetPassword = () => {
    const { token } = useParams();
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email') || '';
    
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formEmail, setFormEmail] = useState(email);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            setError('Token tidak valid');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formEmail) {
            setError('Email harus diisi');
            return;
        }

        if (!password) {
            setError('Password baru harus diisi');
            return;
        }

        if (password !== passwordConfirmation) {
            setError('Password dan konfirmasi password tidak cocok');
            return;
        }

        if (password.length < 8) {
            setError('Password minimal 8 karakter');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.post('/reset-password', {
                token,
                email: formEmail,
                password,
                password_confirmation: passwordConfirmation,
            });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal mereset password. Coba lagi atau minta link reset baru.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            {/* ── Left: Branding ── */}
            <div className="hidden lg:flex w-1/2 bg-[#FFCC80] flex-col items-center justify-center relative">
                <div className="absolute top-[22%] text-center px-8">
                    <h2 className="text-2xl font-normal text-black leading-snug">
                        Selamat Datang di<br />
                        <span className="font-semibold">PT OTAK KANAN</span>
                    </h2>
                </div>

                <img
                    src="/logo.png"
                    alt="PT Otak Kanan Logo"
                    className="w-36 h-36 object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />

                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col rounded-l-full shadow-md overflow-hidden">
                    <Link to="/register" className="px-7 py-2.5 bg-[#FFCC80] text-gray-800 font-normal text-sm text-center transition-colors duration-200 hover:bg-white hover:text-black">
                        Sign Up
                    </Link>
                    <Link to="/login" className="px-7 py-2.5 bg-white text-black font-medium text-sm text-center transition-colors duration-200 hover:bg-white hover:text-black">
                        Login
                    </Link>
                </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 sm:px-14">
                <h1 className="text-2xl md:text-[1.65rem] font-normal text-black text-center mb-10 w-full">
                    Atur Ulang Password
                </h1>

                <div className="w-full max-w-md">
                    {!token ? (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-sm">
                            <div className="text-4xl mb-3">❌</div>
                            <h3 className="font-semibold text-red-700 mb-2">Link Tidak Valid</h3>
                            <p className="text-sm text-red-600 mb-4">
                                Link reset password tidak valid atau sudah kadaluarsa.
                            </p>
                            <Link to="/forgot-password" className="text-sm text-amber-500 hover:text-amber-700 font-medium">
                                Minta link reset baru
                            </Link>
                        </div>
                    ) : success ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-sm">
                            <div className="text-4xl mb-3">✓</div>
                            <h3 className="font-semibold text-green-700 mb-2">Password Berhasil Direset!</h3>
                            <p className="text-sm text-green-600 mb-4">
                                Password kamu telah berhasil diubah. Silakan login dengan password baru.
                            </p>
                            <Link to="/login" className="text-sm text-amber-500 hover:text-amber-700 font-medium">
                                → Ke halaman Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-500 text-center mb-6">
                                Masukkan password baru untuk akun Anda.
                            </p>
                            <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                                
                                <div>
                                    <label className="block text-sm font-medium text-amber-500 mb-1">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formEmail}
                                        onChange={(e) => setFormEmail(e.target.value)}
                                        placeholder="email@contoh.com"
                                        className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2.5 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-amber-500 mb-1">Password Baru</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Min. 8 karakter"
                                            className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2.5 pr-10 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-amber-500 mb-1">Konfirmasi Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPasswordConfirmation ? 'text' : 'password'}
                                            required
                                            value={passwordConfirmation}
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            placeholder="Ulangi password baru"
                                            className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2.5 pr-10 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPasswordConfirmation ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <p className="text-xs text-red-500 text-center bg-red-50 p-2 rounded">{error}</p>
                                )}
                            </form>

                            <div className="mt-8 flex flex-col items-center gap-3">
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !token}
                                    className="bg-[#F59E0B] hover:bg-amber-600 text-white px-12 py-2.5 rounded-2xl font-medium shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 min-w-[150px] text-sm"
                                >
                                    {loading ? 'Memproses...' : 'Reset Password'}
                                </button>
                                <Link to="/login" className="text-xs text-gray-500 hover:text-amber-600 transition-colors">
                                    ← Kembali ke Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
