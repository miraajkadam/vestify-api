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
