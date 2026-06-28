# StellarVow 🤝

StellarVow is a milestone-based escrow payment dApp built for the **Stellar Journey to Mastery: Monthly Builder Challenges (Level 1 - White Belt)**. 

It enables freelancers and clients to secure agreements with transparent, blockchain-verified milestones. Clients can fund specific deliverables, and payments are settled instantly on the Stellar Testnet with near-zero fees.

## 🚀 Live Demo & Repository Details
*   **Target Network:** Stellar Testnet
*   **Wallet Integration:** Freighter Wallet
*   **Challenge Level:** White Belt (Level 1)

---

## ✨ Features
1.  **Freighter Wallet Connection:** Securely connect and disconnect using the official Freighter extension.
2.  **Live Balance Dashboard:** Displays connected wallet XLM balances, refreshed automatically.
3.  **Faucet funding:** Get testnet XLM via Friendbot with one click directly inside the dApp.
4.  **Local Agreement Creator:** Deploy milestone-based agreements detailing deliverable names and XLM targets.
5.  **Secure Escrow Funding:** Construct payment transactions, sign them via Freighter, and submit them directly to Horizon.
6.  **Interactive Explorer Links:** Verify every funded milestone transaction instantly via Stellar.Expert.

---

## 🛠️ Tech Stack
*   **Frontend Framework:** Next.js 15 (App Router, JavaScript)
*   **Stellar SDK:** `@stellar/stellar-sdk` (v12.x+)
*   **Wallet API:** `@stellar/freighter-api`
*   **Styling:** Vanilla CSS (Modern Dark Mode with Glassmorphism)

---

## ⚙️ Installation & Setup

Follow these steps to run StellarVow locally:

### 1. Prerequisites
Ensure you have **Node.js 20+** installed on your system.

### 2. Clone and install dependencies
```bash
cd stellar-vow
npm install
```

### 3. Start the local server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🦊 Freighter Wallet Configuration

To test payments successfully on testnet:
1.  Download and install the extension from [freighter.app](https://www.freighter.app).
2.  Open Freighter → **Settings** (Gear Icon) → **Network** → Switch to **TESTNET**.
3.  Connect your wallet to StellarVow, and click **🎁 Get Testnet XLM** to fund your test account.

