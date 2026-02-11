const express = require('express');
const router = express.Router();
const { getWallets, addWallet, deleteWallet, getWalletBalance } = require('../controllers/walletController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getWallets)
    .post(protect, addWallet);

router.get('/:id/balance', protect, getWalletBalance);

router.route('/:id')
    .delete(protect, deleteWallet);

module.exports = router;
