import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const { token } = JSON.parse(userInfo);
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const loginUser = (data) => API.post('/auth/login', data);
export const registerUser = (data) => API.post('/auth/register', data);
export const getWallets = () => API.get('/wallets');
export const addWallet = (data) => API.post('/wallets', data);
export const deleteWallet = (id) => API.delete(`/wallets/${id}`);
export const getWalletBalance = (id) => API.get(`/wallets/${id}/balance`);

export default API;
