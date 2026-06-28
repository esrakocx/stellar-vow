"use client";

import { useState } from "react";

export default function CreateAgreement({ onCreateAgreement }) {
  const [title, setTitle] = useState("");
  const [freelancer, setFreelancer] = useState("");
  const [milestones, setMilestones] = useState([
    { name: "Design and wireframing", amount: "50" },
  ]);
  const [error, setError] = useState(null);

  const addMilestoneField = () => {
    setMilestones([...milestones, { name: "", amount: "" }]);
  };

  const removeMilestoneField = (index) => {
    if (milestones.length === 1) return;
    const updated = milestones.filter((_, i) => i !== index);
    setMilestones(updated);
  };

  const handleMilestoneChange = (index, field, value) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please enter a project title.");
      return;
    }

    // Stellar public key validation: G... and 56 chars
    const cleanedFreelancer = freelancer.trim();
    if (!cleanedFreelancer.startsWith("G") || cleanedFreelancer.length !== 56) {
      setError("Please enter a valid Stellar Public Key (starts with 'G' and 56 characters long).");
      return;
    }

    if (milestones.some((m) => !m.name.trim() || !m.amount || parseFloat(m.amount) <= 0)) {
      setError("Please ensure all milestones have a title and a positive amount.");
      return;
    }

    const totalAmount = milestones.reduce((sum, m) => sum + parseFloat(m.amount), 0);

    const agreement = {
      id: "agr_" + Date.now(),
      title: title.trim(),
      freelancer: cleanedFreelancer,
      totalAmount,
      milestones: milestones.map((m, index) => ({
        id: `ms_${index}_${Date.now()}`,
        name: m.name.trim(),
        amount: m.amount,
        status: "pending", // pending, funded
        txHash: null,
      })),
      createdAt: new Date().toISOString(),
    };

    onCreateAgreement(agreement);

    // Reset Form
    setTitle("");
    setFreelancer("");
    setMilestones([{ name: "Design and wireframing", amount: "50" }]);
  };

  return (
    <div className="card" id="create-agreement-card">
      <h2 className="section-title">🤝 Create New Agreement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label className="form-label">Project Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Website Redesign"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            id="agreement-title-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Freelancer Address (Public Key)</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. GB2K... (Stellar G Address)"
            value={freelancer}
            onChange={(e) => setFreelancer(e.target.value)}
            required
            id="agreement-freelancer-input"
          />
          <span className="form-hint">Must be a valid testnet account that can accept payment.</span>
        </div>

        <div className="form-group">
          <label className="form-label">Milestones</label>
          {milestones.map((milestone, index) => (
            <div key={index} className="milestone-input-row">
              <input
                type="text"
                className="form-input"
                placeholder="Deliverable description"
                value={milestone.name}
                onChange={(e) => handleMilestoneChange(index, "name", e.target.value)}
                required
              />
              <input
                type="number"
                step="0.00001"
                min="0.00001"
                className="form-input"
                placeholder="Amount (XLM)"
                value={milestone.amount}
                onChange={(e) => handleMilestoneChange(index, "amount", e.target.value)}
                required
              />
              {milestones.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => removeMilestoneField(index)}
                  style={{ alignSelf: "center", padding: "0.75rem" }}
                >
                  🗑️
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={addMilestoneField}
            style={{ marginTop: "0.5rem" }}
          >
            ➕ Add Milestone
          </button>
        </div>

        {error && (
          <div style={{ color: "var(--error)", fontSize: "var(--font-sm)", marginBottom: "1rem" }}>
            ⚠️ {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full" style={{ width: "100%" }} id="create-agreement-submit-btn">
          🚀 Deploy Escrow Agreement
        </button>
      </form>
    </div>
  );
}
