import * as StellarSdk from "@stellar/stellar-sdk";

// ── Network Configuration ──
export const NETWORK = "testnet";
export const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;
export const HORIZON_URL = "https://horizon-testnet.stellar.org";
export const FRIENDBOT_URL = "https://friendbot.stellar.org";
export const EXPLORER_URL = "https://stellar.expert/explorer/testnet";

// ── Horizon Server ──
export const horizon = new StellarSdk.Horizon.Server(HORIZON_URL);

/**
 * Get XLM balance for a Stellar address
 * @param {string} address - Stellar public key
 * @returns {Promise<string>} XLM balance
 */
export async function getBalance(address) {
  try {
    const account = await horizon.loadAccount(address);
    const nativeBalance = account.balances.find(
      (b) => b.asset_type === "native"
    );
    return nativeBalance?.balance || "0";
  } catch (error) {
    if (error?.response?.status === 404) {
      return "0"; // Account not funded
    }
    throw error;
  }
}

/**
 * Fund account with testnet XLM via Friendbot
 * @param {string} address - Stellar public key to fund
 * @returns {Promise<boolean>} success
 */
export async function fundAccount(address) {
  const response = await fetch(`${FRIENDBOT_URL}?addr=${address}`);
  if (!response.ok) {
    const text = await response.text();
    // Friendbot returns error if already funded recently
    if (text.includes("createAccountAlreadyExist")) {
      throw new Error("Account already funded. Try again later.");
    }
    throw new Error(`Friendbot error: ${response.status}`);
  }
  return true;
}

/**
 * Get transaction explorer URL
 * @param {string} hash - Transaction hash
 * @returns {string} Explorer URL
 */
export function getExplorerTxUrl(hash) {
  return `${EXPLORER_URL}/tx/${hash}`;
}

/**
 * Get account explorer URL
 * @param {string} address - Stellar public key
 * @returns {string} Explorer URL
 */
export function getExplorerAccountUrl(address) {
  return `${EXPLORER_URL}/account/${address}`;
}

/**
 * Shorten a Stellar address for display
 * @param {string} address - Full Stellar public key
 * @param {number} chars - Characters to show on each side
 * @returns {string} Shortened address
 */
export function shortenAddress(address, chars = 4) {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
