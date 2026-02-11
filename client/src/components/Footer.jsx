export default function Footer() {
    return (
        <footer className="border-t border-slate-800 py-12 bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <h3 className="text-xl font-bold mb-4">CryptoTrack</h3>
                    <p className="text-slate-400 max-w-sm leading-relaxed">
                        The world's simplest multi-chain wallet tracker. Track balance, transactions, and stay updated with alerts.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Product</h4>
                    <ul className="space-y-2 text-slate-400">
                        <li><a href="#" className="hover:text-indigo-400 transition-all">Features</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-all">Pricing</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-all">Changelog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Legal</h4>
                    <ul className="space-y-2 text-slate-400">
                        <li><a href="#" className="hover:text-indigo-400 transition-all">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-all">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-indigo-400 transition-all">Disclaimer</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                © {new Date().getFullYear()} CryptoTrack. All rights reserved.
            </div>
        </footer>
    );
}
