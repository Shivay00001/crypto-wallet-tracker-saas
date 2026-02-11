import { Link } from 'react-router-dom';
import { Wallet, Shield, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const Feature = ({ icon: Icon, title, desc }) => (
    <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-all group">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-500/20 transition-all">
            <Icon className="text-indigo-400 group-hover:text-indigo-300" size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
);

export default function Landing() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full max-w-7xl px-6 py-24 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 text-sm font-medium mb-8"
                >
                    <Zap size={16} /> <span>Smart Crypto Tracking</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
                >
                    Track Your Crypto <br /> Across Multi-Chains
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl text-xl text-slate-400 mb-10"
                >
                    Monitor your Bitcoin and Ethereum wallets in real-time. Get instant alerts on large transactions and keep your portfolio under control.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4"
                >
                    <Link to="/register" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
                        Get Started Free
                    </Link>
                    <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold border border-slate-700 transition-all">
                        View Live Demo
                    </button>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section className="w-full max-w-7xl px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Feature
                        icon={Wallet}
                        title="Multi-Chain"
                        desc="Track BTC and ETH wallets seamlessly in one unified dashboard with real-time balance updates."
                    />
                    <Feature
                        icon={Shield}
                        title="Privacy First"
                        desc="We don't store your private keys. We only use public addresses to fetch blockchain data."
                    />
                    <Feature
                        icon={BarChart3}
                        title="Analytics"
                        desc="Visualize your recent transactions and historical balance changes with intuitive charts."
                    />
                </div>
            </section>
        </div>
    );
}
