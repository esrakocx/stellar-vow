"use client";

import { shortenAddress } from "@/lib/stellar";

export default function WalletButton({ connected, address, isConnecting, isFreighterInstalled, onConnect, onDisconnect, onShowGuide }) {
  if (isFreighterInstalled === false) {
    return (
      <button className="btn btn-secondary" onClick={onShowGuide} id="install-freighter-btn">
        🦊 Install Freighter
      </button>
    );
  }

  if (connected && address) {
    return (
      <div className="wallet-btn">
        <div className="wallet-address">
          <span className="wallet-address-dot"></span>
          {shortenAddress(address, 4)}
        </div>
        <button className="btn btn-danger btn-sm" onClick={onDisconnect} id="disconnect-wallet-btn">
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      className="btn btn-primary"
      onClick={onConnect}
      disabled={isConnecting}
      id="connect-wallet-btn"
    >
      {isConnecting ? (
        <>
          <span className="loading-spinner"></span>
          Connecting...
        </>
      ) : (
        "🔗 Connect Wallet"
      )}
    </button>
  );
}
