const axios = require('axios');

exports.getBitcoinBalance = async (address) => {
    try {
        const response = await axios.get(`https://blockchain.info/rawaddr/${address}`);
        // Balance is in satoshis
        return {
            balance: response.data.final_balance / 100000000,
            transactions: response.data.txs.slice(0, 5).map(tx => ({
                hash: tx.hash,
                time: tx.time,
                value: tx.result / 100000000 // Approximate for simplicity
            }))
        };
    } catch (error) {
        console.error('BTC Fetch Error:', error.message);
        return { balance: 0, transactions: [] };
    }
};

exports.getEthereumBalance = async (address) => {
    try {
        // Using a public RPC for balance
        const rpcUrl = 'https://cloudflare-eth.com';
        const payload = {
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [address, 'latest'],
            id: 1
        };

        const response = await axios.post(rpcUrl, payload);
        const balanceWei = parseInt(response.data.result, 16);
        const balanceEth = balanceWei / 1e18;

        return {
            balance: balanceEth,
            transactions: [] // Hard to get txs from RPC without scanning blocks.
        };
    } catch (error) {
        console.error('ETH Fetch Error:', error.message);
        return { balance: 0, transactions: [] };
    }
};
