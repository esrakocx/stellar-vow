"use client";

export default function Hero({ onConnect, isConnecting }) {
  return (
    <section className="hero" id="hero-section">
      <div className="hero-badge">
        🤝 Built on Stellar
      </div>

      <h1 className="hero-title">
        Milestone-Based{" "}
        <span className="hero-title-gradient">Escrow Payments</span>
      </h1>

      <p className="hero-subtitle">
        Secure your freelance agreements with blockchain-powered milestones.
        Define deliverables, fund milestones, and release payments
        with full transparency on the Stellar network.
      </p>

      <div className="hero-features">
        <div className="hero-feature">
          <span className="hero-feature-icon">🔒</span>
          Trustless Escrow
        </div>
        <div className="hero-feature">
          <span className="hero-feature-icon">⚡</span>
          5-Second Finality
        </div>
        <div className="hero-feature">
          <span className="hero-feature-icon">💸</span>
          Near-Zero Fees
        </div>
        <div className="hero-feature">
          <span className="hero-feature-icon">🌍</span>
          Global Access
        </div>
      </div>

      <button
        className="btn btn-primary btn-lg"
        onClick={onConnect}
        disabled={isConnecting}
        id="hero-connect-btn"
      >
        {isConnecting ? (
          <>
            <span className="loading-spinner"></span>
            Connecting...
          </>
        ) : (
          "🔗 Connect Wallet to Start"
        )}
      </button>
    </section>
  );
}
