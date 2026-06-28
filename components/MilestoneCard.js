"use client";

import { getExplorerTxUrl } from "@/lib/stellar";

export default function MilestoneCard({ milestone, index, onFundClick }) {
  const isFunded = milestone.status === "funded";

  return (
    <div className={`milestone-card ${isFunded ? "funded" : ""}`} id={`milestone-${milestone.id}`}>
      <div className={`milestone-number ${isFunded ? "funded" : "pending"}`}>
        {isFunded ? "✓" : index + 1}
      </div>

      <div className="milestone-info">
        <div className="milestone-name">{milestone.name}</div>
        <div className="milestone-amount">
          {parseFloat(milestone.amount).toLocaleString()} XLM
        </div>
        {isFunded && milestone.txHash && (
          <div className="milestone-tx">
            🔗 Transaction:{" "}
            <a
              href={getExplorerTxUrl(milestone.txHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="tx-link"
            >
              {milestone.txHash.slice(0, 8)}...{milestone.txHash.slice(-8)}
            </a>
          </div>
        )}
      </div>

      <div className="milestone-actions">
        {isFunded ? (
          <span className="status-badge status-funded">✅ Funded</span>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onFundClick(milestone)}
            id={`fund-btn-${milestone.id}`}
          >
            🔒 Fund Milestone
          </button>
        )}
      </div>
    </div>
  );
}
