"use client";

import { getExplorerTxUrl } from "@/lib/stellar";

export default function TransactionResult({ result, error, onClose }) {
  if (!result && !error) return null;

  const isSuccess = !!result;

  return (
    <div className="tx-overlay" onClick={onClose} id="transaction-result-modal">
      <div className="tx-modal" onClick={(e) => e.stopPropagation()}>
        {isSuccess ? (
          <>
            <div className="tx-icon">✨</div>
            <h2 className="tx-title" style={{ color: "var(--success)" }}>
              Milestone Funded Successfully!
            </h2>
            <p className="tx-message">
              Your transaction has been submitted and confirmed on the Stellar Testnet.
              The funds have been transferred directly to the freelancer.
            </p>

            <div className="tx-hash">
              <span>{result.hash}</span>
            </div>

            <div className="tx-actions">
              <a
                href={getExplorerTxUrl(result.hash)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="explorer-tx-btn"
              >
                🔍 View on Stellar.Expert
              </a>
              <button className="btn btn-secondary" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="tx-icon">⚠️</div>
            <h2 className="tx-title" style={{ color: "var(--error)" }}>
              Transaction Failed
            </h2>
            <p className="tx-message" id="error-message-text">
              {error || "An unexpected error occurred while processing the transaction."}
            </p>

            <div className="tx-actions">
              <button className="btn btn-primary" onClick={onClose}>
                Try Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
