"use client";

import { shortenAddress } from "@/lib/stellar";

export default function FundMilestone({ agreement, milestone, onConfirm, onCancel, funding }) {
  return (
    <div className="fund-confirm" id="fund-milestone-confirm">
      <div className="fund-confirm-title">🔒 Fund Milestone Confirmation</div>

      <div className="fund-confirm-details">
        <div className="fund-detail-row">
          <span className="fund-detail-label">Project:</span>
          <span className="fund-detail-value">{agreement.title}</span>
        </div>
        <div className="fund-detail-row">
          <span className="fund-detail-label">Milestone:</span>
          <span className="fund-detail-value">{milestone.name}</span>
        </div>
        <div className="fund-detail-row">
          <span className="fund-detail-label">Freelancer:</span>
          <span className="fund-detail-value" title={agreement.freelancer}>
            {shortenAddress(agreement.freelancer, 12)}
          </span>
        </div>
        <div className="fund-detail-row" style={{ borderTop: "1px solid var(--border)", paddingTop: "0.5rem", marginTop: "0.25rem" }}>
          <span className="fund-detail-label" style={{ fontWeight: "bold", color: "var(--text-primary)" }}>Amount:</span>
          <span className="fund-detail-value" style={{ fontWeight: "bold", color: "var(--accent-light)", fontSize: "var(--font-lg)" }}>
            {parseFloat(milestone.amount).toLocaleString()} XLM
          </span>
        </div>
      </div>

      <div className="fund-confirm-actions">
        <button
          className="btn btn-primary"
          style={{ flex: 1 }}
          onClick={onConfirm}
          disabled={funding}
          id="confirm-payment-btn"
        >
          {funding ? (
            <>
              <span className="loading-spinner"></span>
              Waiting for Wallet...
            </>
          ) : (
            "✍️ Sign & Fund"
          )}
        </button>
        <button
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={funding}
          id="cancel-payment-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
