import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Wallet2, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-all">
                        <Wallet2 className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Crypto<span className="text-indigo-500">Track</span></span>
                </Link>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-slate-300 hover:text-white flex items-center gap-2 transition-all">
                                <LayoutDashboard size={20} /> <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-slate-400 hover:text-red-400 flex items-center gap-2 transition-all"
                            >
                                <LogOut size={20} /> <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-slate-300 hover:text-white transition-all font-medium">Login</Link>
                            <Link to="/register" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition-all">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
