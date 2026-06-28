"use client";

import WalletButton from "./WalletButton";

export default function Header({ connected, address, isConnecting, isFreighterInstalled, onConnect, onDisconnect, onShowGuide }) {
  return (
    <header className="header" id="app-header">
      <div className="header-logo">
        <div className="header-logo-icon">V</div>
        <div className="header-logo-text">
          Stellar<span>Vow</span>
        </div>
      </div>

      <div className="header-center">
        <div className="network-badge">
          <span className="network-dot"></span>
          Testnet
        </div>
      </div>

      <WalletButton
        connected={connected}
        address={address}
        isConnecting={isConnecting}
        isFreighterInstalled={isFreighterInstalled}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
        onShowGuide={onShowGuide}
      />
    </header>
  );
}
