"use client";

import { shortenAddress } from "@/lib/stellar";
import MilestoneCard from "./MilestoneCard";

export default function AgreementList({ agreements, onFundClick, activeFundMilestone, onDeleteAgreement }) {
  if (agreements.length === 0) {
    return (
      <div className="card empty-state" id="empty-agreements-state">
        <div className="empty-state-icon">📂</div>
        <h3 className="empty-state-title">No Active Agreements</h3>
        <p className="empty-state-desc">
          Create an agreement with milestones to start funding deliverables
          securely on the testnet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" id="agreements-list">
      <h2 className="section-title">📂 Active Escrow Agreements</h2>

      {agreements.map((agreement) => {
        const totalMilestones = agreement.milestones.length;
        const fundedMilestones = agreement.milestones.filter(
          (m) => m.status === "funded"
        ).length;
        const progressPercentage = (fundedMilestones / totalMilestones) * 100;

        return (
          <div key={agreement.id} className="card agreement-card" id={`agreement-${agreement.id}`}>
            <div className="agreement-header">
              <div>
                <h3 className="agreement-title">{agreement.title}</h3>
                <div className="agreement-meta" title={agreement.freelancer}>
                  Freelancer: {shortenAddress(agreement.freelancer, 8)}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="agreement-total">
                  {agreement.totalAmount.toLocaleString()} XLM
                </div>
                <button 
                  className="btn btn-ghost btn-sm" 
                  onClick={() => onDeleteAgreement(agreement.id)}
                  style={{ color: "var(--error)", fontSize: "var(--font-xs)", marginTop: "0.25rem" }}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="agreement-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {fundedMilestones}/{totalMilestones} Milestones Funded
              </span>
            </div>

            <div className="milestone-list">
              {agreement.milestones.map((milestone, index) => (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  index={index}
                  onFundClick={(ms) => onFundClick(agreement, ms)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
