import * as StellarSdk from "@stellar/stellar-sdk";
import { horizon, NETWORK_PASSPHRASE } from "./stellar";

/**
 * Build a payment transaction
 * @param {string} sourceAddress - Sender's Stellar public key
 * @param {string} destinationAddress - Recipient's Stellar public key
 * @param {string} amount - XLM amount as string
 * @param {string} [memo] - Optional memo text (e.g., milestone reference)
 * @returns {Promise<string>} Transaction XDR
 */
export async function buildPaymentTx(
  sourceAddress,
  destinationAddress,
  amount,
  memo
) {
  // Load account from Horizon
  const account = await horizon.loadAccount(sourceAddress);

  // Build transaction
  let builder = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: destinationAddress,
        asset: StellarSdk.Asset.native(),
        amount: amount,
      })
    )
    .setTimeout(180);

  // Add memo if provided
  if (memo) {
    builder = builder.addMemo(StellarSdk.Memo.text(memo.slice(0, 28)));
  }

  const transaction = builder.build();
  return transaction.toXDR();
}

/**
 * Submit a signed transaction to the Stellar network
 * @param {string} signedXdr - Signed transaction XDR
 * @returns {Promise<{hash: string, ledger: number}>} Transaction result
 */
export async function submitTransaction(signedXdr) {
  const transaction = StellarSdk.TransactionBuilder.fromXDR(
    signedXdr,
    NETWORK_PASSPHRASE
  );

  try {
    const response = await horizon.submitTransaction(transaction);
    return {
      hash: response.hash,
      ledger: response.ledger,
      success: true,
    };
  } catch (error) {
    // Extract meaningful error message
    if (error?.response?.data?.extras?.result_codes) {
      const codes = error.response.data.extras.result_codes;
      const opCodes = codes.operations || [];
      
      if (opCodes.includes("op_underfunded")) {
        throw new Error("Insufficient balance to complete this transaction.");
      }
      if (opCodes.includes("op_no_destination")) {
        throw new Error("Destination account does not exist. It needs to be funded first.");
      }
      throw new Error(`Transaction failed: ${opCodes.join(", ") || codes.transaction}`);
    }
    throw new Error(error.message || "Transaction submission failed.");
  }
}
