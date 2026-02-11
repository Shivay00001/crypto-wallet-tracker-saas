const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chain: { type: String, enum: ['BTC', 'ETH'], required: true },
    address: { type: String, required: true },
    label: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wallet', walletSchema);
