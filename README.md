# CryptoTrack SaaS - MERN Wallet Tracker

A production-ready SaaS for tracking Bitcoin and Ethereum wallets. Features include real-time balance fetching, transaction history, and a freemium monetization model.

## 🚀 Features

- **Multi-Chain Support**: Track BTC and ETH addresses in one unified dashboard.
- **SaaS monetization**:
  - **Free Plan**: 1 wallet limit.
  - **Pro Plan**: Unlimited wallets + Alerts.
- **Authentication**: JWT-based login and registration.
- **Tech Stack**: React, Node.js, Express, MongoDB, TailwindCSS, Framer Motion.

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas)

### Backend Setup

1. `cd server`
2. `npm install`
3. Create `.env` file:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. `npm start`

### Frontend Setup

1. `cd client`
2. `npm install`
3. `npm run dev`

## 💸 Payment Integration (Steps)

To monetize this SaaS:

1. **Stripe**:
   - Install `stripe` package in backend.
   - Create a Checkout Session in `/api/payment/create-checkout`.
   - Update `User.isPremium` to `true` on successful webhook.
2. **Razorpay**:
   - Install `razorpay` package.
   - Use Razorpay SDK on frontend for the payment popup.

## 🚢 Deployment

- **Frontend**: Deploy `client` folder to Netlify or Vercel (connect GitHub).
- **Backend**: Deploy `server` folder to Render or Railway.
- **Database**: Use MongoDB Atlas Free Tier.

## ⚖️ Legal

- Disclaimer page included at `/disclaimer`.
- Privacy policy placeholder included.

## 📜 Disclaimer

This software is for educational and informational purposes. Not financial advice.
