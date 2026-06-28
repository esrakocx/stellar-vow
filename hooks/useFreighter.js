"use client";

import { useState, useEffect, useCallback } from "react";
import {
  isConnected,
  getAddress,
  requestAccess,
  signTransaction,
  getNetwork,
} from "@stellar/freighter-api";
import { NETWORK_PASSPHRASE } from "@/lib/stellar";

/**
 * Custom hook for Freighter wallet integration
 * Handles connection, disconnection, and transaction signing
 */
export function useFreighter() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [isFreighterInstalled, setIsFreighterInstalled] = useState(null); // null = checking
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if Freighter is installed and already connected
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const { isConnected: installed, error } = await isConnected();
      if (error || !installed) {
        setIsFreighterInstalled(false);
        return;
      }
      setIsFreighterInstalled(true);

      // Check if already authorized
      const { address: addr, error: addressError } = await getAddress();
      if (addressError || !addr) return;

      const { network: net, error: networkError } = await getNetwork();
      if (networkError) return;

      setConnected(true);
      setAddress(addr);
      setNetwork(net);
    } catch {
      setIsFreighterInstalled(false);
    }
  };

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const { isConnected: installed, error } = await isConnected();
      if (error || !installed) {
        setIsFreighterInstalled(false);
        return { success: false, error: "Freighter extension is not installed." };
      }

      const { address: addr, error: accessError } = await requestAccess();
      if (accessError) {
        return { success: false, error: accessError.message || "Access denied by user." };
      }

      const { network: net, error: networkError } = await getNetwork();
      if (networkError) {
        return { success: false, error: networkError.message };
      }

      setConnected(true);
      setAddress(addr);
      setNetwork(net);
      setIsFreighterInstalled(true);

      return { success: true, address: addr };
    } catch (e) {
      return { success: false, error: e.message || "Connection failed." };
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setAddress(null);
    setNetwork(null);
  }, []);

  const sign = useCallback(
    async (xdr) => {
      if (!connected) throw new Error("Wallet not connected.");
      const { signedTxXdr, error } = await signTransaction(xdr, {
        networkPassphrase: NETWORK_PASSPHRASE,
      });
      if (error) throw new Error(error.message || "Transaction signing failed.");
      return signedTxXdr;
    },
    [connected]
  );

  return {
    connected,
    address,
    network,
    isFreighterInstalled,
    isConnecting,
    connect,
    disconnect,
    sign,
    checkConnection,
  };
}
