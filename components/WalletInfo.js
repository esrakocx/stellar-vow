"use client";

import { useState } from "react";
import { fundAccount, shortenAddress, getExplorerAccountUrl } from "@/lib/stellar";

export default function WalletInfo({ address, balance, onRefresh }) {
  const [funding, setFunding] = useState(false);
  const [fundingError, setFundingError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleFund = async () => {
    setFunding(true);
    setFundingError(null);
    try {
      await fundAccount(address);
      // Wait a moment for Horizon to register the new balance
      setTimeout(() => {
        onRefresh();
        setFunding(false);
      }, 2000);
    } catch (err) {
      setFundingError(err.message || "Failed to fund account.");
      setFunding(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card balance-card" id="wallet-info-card">
      <div className="balance-label">Connected Wallet Balance</div>
      <div className="balance-amount" id="xlm-balance-display">
        {parseFloat(balance).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        })}
      </div>
      <div className="balance-currency">XLM</div>

      <div className="balance-address">
        <span id="full-wallet-address">{shortenAddress(address, 8)}</span>
        <button className="copy-btn" onClick={handleCopy} title="Copy Address">
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
        <span>•</span>
        <a
          href={getExplorerAccountUrl(address)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-link"
          style={{ fontSize: "var(--font-xs)" }}
        >
          🔍 View on Explorer
        </a>
      </div>

      <div className="balance-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={onRefresh}
          disabled={funding}
        >
          🔄 Refresh Balance
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleFund}
          disabled={funding}
          id="friendbot-fund-btn"
        >
          {funding ? "Funding..." : "🎁 Get Testnet XLM"}
        </button>
      </div>

      {fundingError && (
        <div style={{ color: "var(--error)", fontSize: "var(--font-xs)", marginTop: "1rem" }}>
          ⚠️ {fundingError}
        </div>
      )}
    </div>
  );
}
