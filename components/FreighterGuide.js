"use client";

export default function FreighterGuide({ onClose }) {
  return (
    <div className="guide-overlay" onClick={onClose} id="freighter-guide">
      <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="guide-title">🦊 Install Freighter Wallet</h2>

        <ol className="guide-steps">
          <li className="guide-step">
            <span className="guide-step-number">1</span>
            <div className="guide-step-content">
              <div className="guide-step-title">Install the Extension</div>
              <div className="guide-step-desc">
                Visit{" "}
                <a
                  href="https://www.freighter.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  freighter.app
                </a>{" "}
                and install the Chrome/Brave browser extension.
              </div>
            </div>
          </li>

          <li className="guide-step">
            <span className="guide-step-number">2</span>
            <div className="guide-step-content">
              <div className="guide-step-title">Create or Import Wallet</div>
              <div className="guide-step-desc">
                Follow the setup wizard to create a new wallet or import an
                existing one with your secret key.
              </div>
            </div>
          </li>

          <li className="guide-step">
            <span className="guide-step-number">3</span>
            <div className="guide-step-content">
              <div className="guide-step-title">Switch to Testnet</div>
              <div className="guide-step-desc">
                Open Freighter → Settings → Network → Select{" "}
                <strong>TESTNET</strong>. This is required for development.
              </div>
            </div>
          </li>

          <li className="guide-step">
            <span className="guide-step-number">4</span>
            <div className="guide-step-content">
              <div className="guide-step-title">Refresh & Connect</div>
              <div className="guide-step-desc">
                Refresh this page and click &quot;Connect Wallet&quot; to get started.
              </div>
            </div>
          </li>
        </ol>

        <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem" }}>
          <a
            href="https://www.freighter.app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ flex: 1, textAlign: "center" }}
          >
            Download Freighter
          </a>
          <button className="btn btn-secondary" onClick={onClose} style={{ flex: 1 }}>
            I&apos;ve Installed It
          </button>
        </div>
      </div>
    </div>
  );
}
