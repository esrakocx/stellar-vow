"use client";

import { useState, useEffect } from "react";
import { useFreighter } from "@/hooks/useFreighter";
import { getBalance } from "@/lib/stellar";
import { buildPaymentTx, submitTransaction } from "@/lib/transactions";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WalletInfo from "@/components/WalletInfo";
import CreateAgreement from "@/components/CreateAgreement";
import AgreementList from "@/components/AgreementList";
import FundMilestone from "@/components/FundMilestone";
import TransactionResult from "@/components/TransactionResult";
import FreighterGuide from "@/components/FreighterGuide";

export default function Home() {
  const {
    connected,
    address,
    isConnecting,
    isFreighterInstalled,
    connect,
    disconnect,
    sign,
  } = useFreighter();

  const [balance, setBalance] = useState("0");
  const [agreements, setAgreements] = useState([]);
  const [showGuide, setShowGuide] = useState(false);
  
  // Funding transaction states
  const [activeFund, setActiveFund] = useState(null); // { agreement, milestone }
  const [funding, setFunding] = useState(false);
  const [txResult, setTxResult] = useState(null);
  const [txError, setTxError] = useState(null);

  // Load agreements from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("stellar_vow_agreements");
    if (saved) {
      try {
        setAgreements(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse agreements", e);
      }
    }
  }, []);

  // Fetch balance when wallet connects or address changes
  useEffect(() => {
    if (connected && address) {
      fetchBalance();
      // Periodically refresh balance every 15 seconds
      const interval = setInterval(fetchBalance, 15000);
      return () => clearInterval(interval);
    }
  }, [connected, address]);

  const fetchBalance = async () => {
    if (!address) return;
    try {
      const bal = await getBalance(address);
      setBalance(bal);
    } catch (e) {
      console.error("Failed to fetch balance", e);
    }
  };

  const handleCreateAgreement = (newAgreement) => {
    const updated = [newAgreement, ...agreements];
    setAgreements(updated);
    localStorage.setItem("stellar_vow_agreements", JSON.stringify(updated));
  };

  const handleDeleteAgreement = (id) => {
    const updated = agreements.filter((a) => a.id !== id);
    setAgreements(updated);
    localStorage.setItem("stellar_vow_agreements", JSON.stringify(updated));
    // Clear active fund state if it belonged to deleted agreement
    if (activeFund?.agreement?.id === id) {
      setActiveFund(null);
    }
  };

  const handleFundClick = (agreement, milestone) => {
    setActiveFund({ agreement, milestone });
  };

  const handleConfirmFund = async () => {
    if (!activeFund || !address) return;
    setFunding(true);
    setTxError(null);
    setTxResult(null);

    const { agreement, milestone } = activeFund;

    try {
      // 1. Build payment transaction
      const memo = `${agreement.title.slice(0, 15)}: ${milestone.name.slice(0, 10)}`;
      const xdr = await buildPaymentTx(
        address,
        agreement.freelancer,
        milestone.amount,
        memo
      );

      // 2. Sign transaction with Freighter wallet
      const signedXdr = await sign(xdr);

      // 3. Submit transaction to Stellar Network via Horizon
      const result = await submitTransaction(signedXdr);

      // 4. Update agreement state
      const updatedAgreements = agreements.map((a) => {
        if (a.id === agreement.id) {
          return {
            ...a,
            milestones: a.milestones.map((m) => {
              if (m.id === milestone.id) {
                return { ...m, status: "funded", txHash: result.hash };
              }
              return m;
            }),
          };
        }
        return a;
      });

      setAgreements(updatedAgreements);
      localStorage.setItem(
        "stellar_vow_agreements",
        JSON.stringify(updatedAgreements)
      );

      setTxResult(result);
      setActiveFund(null); // Clear confirmation pane
      fetchBalance(); // Refresh balance
    } catch (err) {
      setTxError(err.message || "Failed to process transaction.");
    } finally {
      setFunding(false);
    }
  };

  const handleConnect = async () => {
    const res = await connect();
    if (res && !res.success) {
      setShowGuide(true);
    }
  };

  return (
    <div className="app-container">
      <Header
        connected={connected}
        address={address}
        isConnecting={isConnecting}
        isFreighterInstalled={isFreighterInstalled}
        onConnect={handleConnect}
        onDisconnect={disconnect}
        onShowGuide={() => setShowGuide(true)}
      />

      <main style={{ paddingBottom: "var(--space-3xl)" }}>
        {!connected ? (
          <Hero onConnect={handleConnect} isConnecting={isConnecting} />
        ) : (
          <div className="dashboard">
            <WalletInfo
              address={address}
              balance={balance}
              onRefresh={fetchBalance}
            />

            <div className="dashboard-grid">
              <div>
                <CreateAgreement onCreateAgreement={handleCreateAgreement} />
                
                {activeFund && (
                  <FundMilestone
                    agreement={activeFund.agreement}
                    milestone={activeFund.milestone}
                    onConfirm={handleConfirmFund}
                    onCancel={() => setActiveFund(null)}
                    funding={funding}
                  />
                )}
              </div>

              <div>
                <AgreementList
                  agreements={agreements}
                  onFundClick={handleFundClick}
                  activeFundMilestone={activeFund?.milestone}
                  onDeleteAgreement={handleDeleteAgreement}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {showGuide && <FreighterGuide onClose={() => setShowGuide(false)} />}

      <TransactionResult
        result={txResult}
        error={txError}
        onClose={() => {
          setTxResult(null);
          setTxError(null);
        }}
      />
    </div>
  );
}
