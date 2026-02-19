🎓 Anonymous Campus Feedback System (Algorand Powered)

A privacy-first, blockchain-backed platform that enables students to submit anonymous feedback while ensuring authenticity through Algorand-based verification.

Built for hackathons 🚀 — combining privacy, transparency, and decentralization.

🌟 Features

🔐 Anonymous Feedback Submission
Students can share feedback without revealing identity.

🪙 Blockchain-Based Student Verification
Only users holding a campus Algorand token (ASA) can submit feedback.

🔗 Tamper-Proof Proofs
Each feedback entry is cryptographically hashed and anchored on the Algorand blockchain.

📢 Public Feedback Board
Transparent and accessible feedback display.

⚡ Lightweight + Fast
Uses Algorand Testnet for instant, low-cost transactions.

🧠 How It Works

Students connect using their Algorand wallet address

System verifies ownership of the campus verification token (ASA)

Feedback is submitted anonymously

Feedback hash is stored on Algorand as a transaction note

Public dashboard displays feedback with blockchain proof

🏗 Tech Stack
Frontend

React.js

Axios

Basic CSS

Backend

Node.js

Express.js

Algorand JavaScript SDK

Blockchain

Algorand Testnet

ASA (Algorand Standard Asset) for student verification

🪙 Blockchain Architecture
Component	Purpose
ASA Token	Student verification
Algorand Testnet	Immutable proof storage
Transaction Notes	Feedback hash anchoring
📂 Project Structure
campus-feedback/
│
├── frontend/          # React frontend
│   └── src/App.js
│
└── backend/
    ├── server.js      # API server
    ├── createToken.js # ASA creation script
    └── .env

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/campus-feedback.git
cd campus-feedback

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=5000
MNEMONIC=your_25_word_wallet_seed
ASA_ID=your_token_id

3️⃣ Create Campus Token (Run Once)
node createToken.js


Find ASA ID from AlgoExplorer and update .env.

4️⃣ Start Backend Server
node server.js


Server runs at:

http://localhost:5000

5️⃣ Frontend Setup
cd ../frontend
npm install
npm start


App runs at:

http://localhost:3000

🧪 Testing the App

Send campus token (CPS) to a student wallet

Enter wallet address in UI

Verify student eligibility

Submit anonymous feedback

View blockchain proof (Transaction ID)

🔐 Privacy Model

No wallet addresses stored in database

Only token ownership checked

Feedback stored anonymously

Blockchain stores only cryptographic hashes
