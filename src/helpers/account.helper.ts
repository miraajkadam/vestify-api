import { AddWalletPayload } from '@/types/Account'
import { isValidGuid } from '@/utils/common'
import { isValidWalletAddress } from '@/utils/web3'

/**
 * Validates the payload for adding a wallet.
 *
 * This function ensures that the provided payload has the correct structure and that the wallet address, chain, and account ID are valid.
 * It checks if the wallet address matches the expected format for the given blockchain (`chain`), and if the account ID is a valid GUID.
 *
 * @param {AddWalletPayload} payload - The payload containing wallet details to be validated.
 * @param {string} payload.address - The wallet address to be validated.
 * @param {Chain} payload.chain - The blockchain (e.g., Ethereum, Solana) associated with the wallet address.
 * @param {string} payload.accountId - The unique identifier for the account that the wallet will be linked to.
 *
 * @returns {boolean} Returns `true` if the payload is valid, otherwise `false`.
 *
 * @example
 * const payload = {
 *   address: '0x1234567890abcdef1234567890abcdef12345678',
 *   chain: 'EVM',
 *   accountId: '21a9ddea-81eb-48cb-86ba-a39ceb305bc4'
 * };
 * const isValid = validateAddWalletPayload(payload); // true
 *
 * @example
 * const invalidPayload = {
 *   address: 'invalid_address',
 *   chain: 'EVM',
 *   accountId: 'invalid_account_id'
 * };
 * const isValid = validateAddWalletPayload(invalidPayload); // false
 */
export const validateAddWalletPayload = (payload: AddWalletPayload): boolean => {
  if (!payload || typeof payload !== 'object') return false

  const { chain, address } = payload
  if (!isValidWalletAddress(chain, address)) return false

  const { accountId } = payload
  if (!isValidGuid(accountId)) return false

  return true
}
