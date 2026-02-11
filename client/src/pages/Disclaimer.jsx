export default function Disclaimer() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24 prose prose-invert">
            <h1 className="text-4xl font-bold mb-8">Legal Disclaimer</h1>
            <div className="space-y-6 text-slate-400 leading-relaxed">
                <p>
                    The information provided by CryptoTrack is for informational purposes only. We do not provide financial, investment, legal, or tax advice.
                </p>
                <p>
                    CryptoTrack is not a wallet provider. We do not store, send, or receive cryptocurrencies. We only provide an interface to view publicly available blockchain data.
                </p>
                <p>
                    Investments in cryptocurrencies are volatile and carry high risk. You are solely responsible for your own financial decisions.
                </p>
            </div>
        </div>
    );
}
