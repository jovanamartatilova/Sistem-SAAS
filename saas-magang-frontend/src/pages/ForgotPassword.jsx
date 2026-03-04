import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/forgot-password', { email });
            setSuccessMsg(res.data?.message || 'Link reset dikirim.');
            setSuccess(true);
        } catch (err) {
            // network/server error
            setError(err.response?.data?.message || 'Gagal mengirim email reset password.');
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
                    Lupa Password?
                </h1>

                <div className="w-full max-w-md">
                    {success ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-sm">
                            <div className="text-4xl mb-3">📧</div>
                            <h3 className="font-semibold text-green-700 mb-2">Email Terkirim!</h3>
                            <p className="text-sm text-green-600 mb-4">
                                {successMsg || (
                                    <>Kami sudah mengirim link reset password ke <strong>{email}</strong>. Silakan cek inbox atau folder spam kamu.</>
                                )}
                            </p>
                            <Link to="/login" className="text-sm text-amber-500 hover:text-amber-700 font-medium">
                                ← Kembali ke Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-gray-500 text-center mb-6">
                                Masukkan email yang terdaftar. Kami akan kirimkan link untuk reset password.
                            </p>
                            <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-amber-500 mb-1">Alamat Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@contoh.com"
                                        className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2.5 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm"
                                    />
                                </div>
                                {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                            </form>

                            <div className="mt-8 flex flex-col items-center gap-3">
                                <button onClick={handleSubmit} disabled={loading}
                                    className="bg-[#F59E0B] hover:bg-amber-600 text-white px-12 py-2.5 rounded-2xl font-medium shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 min-w-[150px] text-sm">
                                    {loading ? 'Mengirim...' : 'Kirim Link Reset'}
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

export default ForgotPassword;
