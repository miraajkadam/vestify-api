import type { Decimal } from '@prisma/client/runtime/library'

/**
 * Validates if the provided payload values meet the expected criteria for an AddNewVCPayload.
 *
 * @param {string} name - The name of the VC, which should be a non-empty string.
 * @param {string} description - A description of the VC, which should be a non-empty string.
 * @param {string} logoBase64 - A Base64-encoded string representing the logo, which should be a non-empty string.
 * @param {number} subscriptionFee - The subscription fee, which should be a non-negative number.
 * @param {string[]} tags - An array of tags associated with the VC, where each tag should be a non-empty string.
 * @param {boolean} kycDone - A boolean indicating whether KYC (Know Your Customer) verification is completed.
 *
 * @returns {boolean} Returns `true` if all parameters meet their respective validation criteria, otherwise `false`.
 *
 * @example
 * const isValid = isAddNewVCPayloadValid(
 *   "Sample VC",
 *   "This is a sample VC",
 *   "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
 *   99.99,
 *   ["tag1", "tag2"],
 *   true
 * );
 * console.log(isValid); // Output: true
 */
export const isAddNewVCPayloadValid = (
  name: string,
  description: string,
  logoBase64: string,
  subscriptionFee: Decimal,
  tags: string[],
  kycDone: boolean
) => {
  // Check if name and description are non-empty strings
  if (typeof name !== 'string' || name.trim().length === 0) return false
  if (typeof description !== 'string' || description.trim().length === 0) return false

  // Check if logoBase64 is a non-empty string
  if (typeof logoBase64 !== 'string' || logoBase64.trim().length === 0) return false

  // Check if subscriptionFee is a non-negative number
  if (typeof subscriptionFee !== 'number' || subscriptionFee < 0) return false

  // Check if tags is an array of non-empty strings
  if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string' && tag.trim().length > 0))
    return false

  // Check if kycDone is a boolean
  if (typeof kycDone !== 'boolean') return false

  return true
}
