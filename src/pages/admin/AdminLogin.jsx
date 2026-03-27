import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';

const AdminLogin = () => {
    const { currentUser, login } = useAuth();
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    if (currentUser) return <Navigate to="/admin/dashboard" replace />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setError('');
        try {
            await login(form.email, form.password);
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            setStatus('idle');
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/5 via-transparent to-transparent" />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,107,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.5) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="glass rounded-2xl p-8 border border-orange-500/15 shadow-card">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <motion.div
                            animate={{ boxShadow: ['0 0 20px #FF6B00', '0 0 40px #FF6B00', '0 0 20px #FF6B00'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-16 rounded-xl mx-auto mb-4 overflow-hidden"
                        >
                            <img src="/navlogo.png" alt="Sandhya SoftTech Logo" className="w-full h-full object-contain" />
                        </motion.div>
                        <h1 className="font-display font-bold text-white text-2xl">Admin Portal</h1>
                        <p className="text-gray-500 text-sm mt-1">Sandhya SoftTech Pvt. Ltd.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-gray-400 block mb-1.5">Email Address</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                                required
                                placeholder="admin@sandhyasofttech.com"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-400 block mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                                    required
                                    placeholder="••••••••"
                                    className="pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
                                >
                                    {showPass ? <HiEyeOff /> : <HiEye />}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
                        >
                            <HiLockClosed />
                            {status === 'loading' ? 'Signing in...' : 'Sign In'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
