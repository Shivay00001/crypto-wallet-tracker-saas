import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getWallets, addWallet, deleteWallet, getWalletBalance } from '../services/apiService';
import { Plus, Trash2, RefreshCw, ExternalLink, Wallet as WalletIcon, Coins, Loader2, AlertCircle } from 'lucide-react';

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingWallet, setAddingWallet] = useState(false);
    const [newWallet, setNewWallet] = useState({ chain: 'ETH', address: '', label: '' });
    const [error, setError] = useState('');
    const [syncing, setSyncing] = useState({});

    useEffect(() => {
        fetchWallets();
    }, []);

    const fetchWallets = async () => {
        try {
            const { data } = await getWallets();
            setWallets(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddWallet = async (e) => {
        e.preventDefault();
        setAddingWallet(true);
        setError('');
        try {
            await addWallet(newWallet);
            setNewWallet({ chain: 'ETH', address: '', label: '' });
            fetchWallets();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add wallet');
        } finally {
            setAddingWallet(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Remove this wallet?')) return;
        try {
            await deleteWallet(id);
            setWallets(wallets.filter(w => w._id !== id));
        } catch (err) {
            alert('Error deleting wallet');
        }
    };

    const syncBalance = async (id) => {
        setSyncing(prev => ({ ...prev, [id]: true }));
        try {
            const { data } = await getWalletBalance(id);
            setWallets(wallets.map(w => w._id === id ? { ...w, balance: data.balance, txs: data.transactions } : w));
        } catch (err) {
            alert('Error syncing balance');
        } finally {
            setSyncing(prev => ({ ...prev, [id]: false }));
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
            <span className="text-slate-400 font-medium">Loading your dashboard...</span>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold mb-2">My Wallets</h1>
                    <p className="text-slate-400">Manage and monitor your crypto assets</p>
                </div>
                {!user?.isPremium && wallets.length >= 1 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-center gap-3">
                        <Coins className="text-amber-500" size={24} />
                        <div>
                            <p className="text-sm font-semibold text-amber-500">Free Plan Active</p>
                            <p className="text-xs text-slate-400">Upgrade to add unlimited wallets</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Wallet List */}
                <div className="lg:col-span-2 space-y-6">
                    {wallets.length === 0 ? (
                        <div className="bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-3xl p-12 text-center">
                            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <WalletIcon className="text-slate-500" size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">No wallets added yet</h3>
                            <p className="text-slate-400 mb-8">Add your first wallet to start tracking balances.</p>
                        </div>
                    ) : (
                        wallets.map(wallet => (
                            <div key={wallet._id} className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:border-indigo-500 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-white shadow-lg ${wallet.chain === 'BTC' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                                        {wallet.chain}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">{wallet.label || 'Unnamed Wallet'}</h4>
                                        <p className="text-slate-400 text-sm font-mono truncate max-w-[200px] md:max-w-xs">{wallet.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Balance</p>
                                        <p className="text-2xl font-black text-white">
                                            {syncing[wallet._id] ? '---' : (wallet.balance?.toFixed(4) || '0.0000')} <span className="text-sm text-slate-400">{wallet.chain}</span>
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => syncBalance(wallet._id)}
                                            disabled={syncing[wallet._id]}
                                            className="p-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition-all disabled:opacity-50"
                                            title="Sync Balance"
                                        >
                                            <RefreshCw size={20} className={syncing[wallet._id] ? 'animate-spin' : ''} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(wallet._id)}
                                            className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
                                            title="Remove Wallet"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Add Wallet Form */}
                <div className="lg:col-span-1">
                    <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Add New Wallet</h3>
                        {error && (
                            <div className="flex items-center gap-2 p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs">
                                <AlertCircle size={16} /> {error}
                            </div>
                        )}
                        <form onSubmit={handleAddWallet} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Blockchain</label>
                                <select
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl outline-none focus:border-indigo-500 transition-all"
                                    value={newWallet.chain}
                                    onChange={(e) => setNewWallet({ ...newWallet, chain: e.target.value })}
                                >
                                    <option value="ETH">Ethereum (ETH)</option>
                                    <option value="BTC">Bitcoin (BTC)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Address</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Paste address here"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl outline-none focus:border-indigo-500 transition-all font-mono"
                                    value={newWallet.address}
                                    onChange={(e) => setNewWallet({ ...newWallet, address: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Label (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. My Ledger"
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl outline-none focus:border-indigo-500 transition-all"
                                    value={newWallet.label}
                                    onChange={(e) => setNewWallet({ ...newWallet, label: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={addingWallet || (!user?.isPremium && wallets.length >= 1)}
                                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:bg-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20 mt-4"
                            >
                                {addingWallet ? <Loader2 className="animate-spin" size={22} /> : (
                                    <>
                                        <Plus size={22} /> Add Wallet
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
