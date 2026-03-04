import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../store/useAuth';

const ROLES = [
    'Super Admin',
    'Admin Perusahaan',
    'HR',
    'Mentor',
    'Peserta',
    'Ketua Kelompok',
    'Anggota Kelompok',
];

// Eye icons
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

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
        instansi: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) return;
        const success = await register({
            name: formData.username,
            email: formData.email,
            password: formData.password,
            role: formData.role,
            company_name: formData.instansi,
        });
        if (success) navigate('/dashboard');
    };

    const pwStrength = formData.password.length;
    const pwOk = pwStrength >= 8;

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

                {/* Logo — ganti logo.png di folder public/ */}
                <img
                    src="/logo.png"
                    alt="PT Otak Kanan Logo"
                    className="w-36 h-36 object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />

                {/* Sign Up / Login toggle */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col rounded-l-full shadow-md overflow-hidden">
                    <Link to="/register" className="px-7 py-2.5 bg-white text-black font-medium text-sm text-center transition-colors duration-200 hover:bg-white hover:text-black">
                        Sign Up
                    </Link>
                    <Link to="/login" className="px-7 py-2.5 bg-[#FFCC80] text-gray-800 font-normal text-sm text-center transition-colors duration-200 hover:bg-white hover:text-black">
                        Login
                    </Link>
                </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 sm:px-14">
                <h1 className="text-2xl md:text-[1.65rem] font-normal text-black text-center mb-10 w-full">
                    Melangkah ke Masa Depan yang Cerah
                </h1>

                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm space-y-4">

                        <div>
                            <label className="block text-sm font-medium text-amber-500 mb-1">Username</label>
                            <input type="text" name="username" required value={formData.username} onChange={handleChange}
                                className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-500 mb-1">Email</label>
                            <input type="email" name="email" required value={formData.email} onChange={handleChange}
                                className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-500 mb-1">Role</label>
                            <select name="role" required value={formData.role} onChange={handleChange}
                                className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm appearance-none cursor-pointer">
                                <option value="" disabled>Pilih role...</option>
                                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-500 mb-1">Instansi</label>
                            <input type="text" name="instansi" required value={formData.instansi} onChange={handleChange}
                                className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm" />
                        </div>

                        {/* Password with eye toggle */}
                        <div>
                            <label className="block text-sm font-medium text-amber-500 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    minLength={8}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-[#EEEEEE] border-none rounded-md px-4 py-2 pr-10 text-gray-800 focus:ring-1 focus:ring-amber-400 outline-none text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                </button>
                            </div>
                            {/* Strength indicator */}
                            {formData.password.length > 0 && (
                                <div className="mt-1.5">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${pwStrength >= 12 ? 'bg-green-500' :
                                                    pwStrength >= 8 ? (i <= 3 ? 'bg-amber-400' : 'bg-gray-200') :
                                                        pwStrength >= 4 ? (i <= 2 ? 'bg-red-400' : 'bg-gray-200') :
                                                            (i <= 1 ? 'bg-red-500' : 'bg-gray-200')
                                                }`} />
                                        ))}
                                    </div>
                                    <p className={`text-xs mt-0.5 ${pwOk ? 'text-green-600' : 'text-red-500'}`}>
                                        {pwOk ? 'Password cukup kuat' : `Minimal 8 karakter (${formData.password.length}/8)`}
                                    </p>
                                </div>
                            )}
                        </div>

                        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
                    </form>

                    <div className="mt-8 flex justify-center">
                        <button onClick={handleSubmit} disabled={loading || !pwOk}
                            className="bg-[#F59E0B] hover:bg-amber-600 text-white px-12 py-2.5 rounded-2xl font-medium shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 min-w-[150px] text-sm">
                            {loading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
