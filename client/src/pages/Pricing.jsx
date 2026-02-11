import { Check, Zap } from 'lucide-react';

const PricingCard = ({ title, price, features, isPopular, highlighted }) => (
    <div className={`p-8 rounded-3xl border ${highlighted ? 'bg-indigo-600 border-indigo-400 shadow-xl shadow-indigo-600/20' : 'bg-slate-800 border-slate-700'} flex flex-col`}>
        {isPopular && (
            <span className="bg-white text-indigo-600 text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">MOST POPULAR</span>
        )}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-6">
            <span className="text-4xl font-black">${price}</span>
            <span className={highlighted ? 'text-indigo-200' : 'text-slate-400'}>/month</span>
        </div>
        <ul className="space-y-4 mb-8 flex-grow">
            {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                    <Check size={18} className={highlighted ? 'text-white' : 'text-indigo-400'} />
                    <span className={highlighted ? 'text-indigo-50' : 'text-slate-300'}>{f}</span>
                </li>
            ))}
        </ul>
        <button className={`w-full py-4 rounded-xl font-bold transition-all ${highlighted ? 'bg-white text-indigo-600 hover:bg-slate-100' : 'bg-slate-700 hover:bg-slate-600'}`}>
            {price === 0 ? 'Current Plan' : 'Upgrade Now'}
        </button>
    </div>
);

export default function Pricing() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <h1 className="text-5xl font-bold mb-4">Simple Pricing</h1>
                <p className="text-slate-400 text-lg">No hidden fees. Scale as you grow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <PricingCard
                    title="Free"
                    price={0}
                    features={['Track 1 Wallet', 'Real-time Balance', 'Basic TX History', 'Community Support']}
                />
                <PricingCard
                    isPopular
                    highlighted
                    title="Pro"
                    price={9}
                    features={['Unlimited Wallets', 'Email Alerts', 'Large Transaction Detection', 'Priority Support', 'CSV Exports']}
                />
            </div>
        </div>
    );
}
