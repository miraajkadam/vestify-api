import { faker } from '@faker-js/faker'
import { Chain } from '@prisma/client'

/**
 * Validates if the provided string is a valid Ethereum address.
 *
 * Ethereum addresses are 40 hexadecimal characters (0-9, a-f) and start with '0x'.
 *
 * @param {string} address - The Ethereum address to validate.
 * @returns {boolean} Returns true if the address is a valid Ethereum address, false otherwise.
 *
 * @example
 * // Returns true
 * isValidEthereumAddress('0x32Be343B94f860124dC4fEe278FDCBD38C102D88');
 *
 * @example
 * // Returns false
 * isValidEthereumAddress('0x32Be343B94f860124dC4fEe278FDCBD38C102D8');
 */
export const isValidEthereumAddress = (address: string): boolean =>
  /^0x[a-fA-F0-9]{40}$/.test(address)

/**
 * Validates if the provided string is a valid Solana address.
 *
 * Solana addresses are typically base-58 encoded strings that are between 32 and 44 characters long.
 * The base-58 encoding excludes characters like `0`, `O`, `I`, and `l` to avoid confusion.
 *
 * @param {string} address - The Solana address to validate.
 * @returns {boolean} Returns true if the address is a valid Solana address, false otherwise.
 *
 * @example
 * // Returns true
 * isValidSolanaAddress('5Kx6M2nViwAaFr8KfGg2XZ8Z9H1h8Bo7V1bZxz26cjjE');
 *
 * @example
 * // Returns false
 * isValidSolanaAddress('5Kx6M2nViwAaFr8KfGg2XZ8Z9H1h8Bo7V1bZxz26cjj');
 */
export const isValidSolanaAddress = (address: string): boolean =>
  /^[A-Za-z0-9]{32,44}$/.test(address)

/**
 * Validates if the provided wallet address is valid for the specified blockchain.
 *
 * This function checks whether the wallet address is valid for either an Ethereum (EVM) or Solana address,
 * based on the provided blockchain type. It uses the `isValidEthereumAddress` function to validate Ethereum
 * addresses and the `isValidSolanaAddress` function to validate Solana addresses.
 *
 * @param {Chain} chain - The blockchain to validate against. Can be either 'EVM' (for Ethereum) or 'SOLANA' (for Solana).
 * @param {string} walletAddress - The wallet address to validate.
 * @returns {boolean} Returns true if the address is valid for the given blockchain, false otherwise.
 *
 * @throws {Error} Throws an error if the provided `chain` is not 'EVM' or 'SOLANA'.
 *
 * @example
 * // Returns true
 * isValidWalletAddress('EVM', '0x32Be343B94f860124dC4fEe278FDCBD38C102D88');
 *
 * @example
 * // Returns false
 * isValidWalletAddress('EVM', '0x32Be343B94f860124dC4fEe278FDCBD38C102D8');
 *
 * @example
 * // Returns true
 * isValidWalletAddress('SOLANA', '5Kx6M2nViwAaFr8KfGg2XZ8Z9H1h8Bo7V1bZxz26cjjE');
 *
 * @example
 * // Returns false
 * isValidWalletAddress('SOLANA', '5Kx6M2nViwAaFr8KfGg2XZ8Z9H1h8Bo7V1bZxz26cjj');
 */
export const isValidWalletAddress = (chain: Chain, walletAddress: string): boolean => {
  const validChains = ['EVM', 'SOLANA']

  if (!validChains.includes(chain)) return false

  if (typeof walletAddress !== 'string' || walletAddress.trim() === '') return false

  if (chain === 'EVM' && !isValidEthereumAddress(walletAddress)) return false

  if (chain === 'SOLANA' && !isValidSolanaAddress(walletAddress)) return false

  return true
}

export const genRandomETHAddress = () => faker.finance.ethereumAddress()
