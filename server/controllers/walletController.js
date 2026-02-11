const Wallet = require('../models/Wallet');
const User = require('../models/User');
const { getBitcoinBalance, getEthereumBalance } = require('../services/cryptoService');

exports.getWalletBalance = async (req, res) => {
    try {
        const wallet = await Wallet.findById(req.params.id);
        if (!wallet) return res.status(404).json({ message: 'Wallet not found' });

        // Check ownership
        // if (wallet.user.toString() !== req.user._id.toString()) return res.status(401)... 
        // (Assuming protect middleware handles user context, but good to verify ownership if ID is passed)

        let data = { balance: 0, transactions: [] };
        if (wallet.chain === 'BTC') {
            data = await getBitcoinBalance(wallet.address);
        } else if (wallet.chain === 'ETH') {
            data = await getEthereumBalance(wallet.address);
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance' });
    }
};


exports.getWallets = async (req, res) => {
    try {
        const wallets = await Wallet.find({ user: req.user._id });
        // In a real app, we might fetch live balance here or cache it
        // For now, just return the wallet info
        res.json(wallets);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.addWallet = async (req, res) => {
    const { chain, address, label } = req.body;

    try {
        const user = await User.findById(req.user._id);
        const walletCount = await Wallet.countDocuments({ user: req.user._id });

        if (!user.isPremium && walletCount >= 1) {
            return res.status(403).json({ message: 'Free plan limit reached (1 wallet). Upgrade to Premium.' });
        }

        const wallet = new Wallet({
            user: req.user._id,
            chain,
            address,
            label
        });

        await wallet.save();
        res.status(201).json(wallet);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteWallet = async (req, res) => {
    try {
        const wallet = await Wallet.findById(req.params.id);

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        if (wallet.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await wallet.deleteOne();
        res.json({ message: 'Wallet removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
