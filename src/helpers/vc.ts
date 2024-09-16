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

/**
 * Validates if the provided ID is a valid GUID (Globally Unique Identifier).
 *
 * This function checks if the provided string matches the GUID format, which is a 36-character
 * string with the format "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", where each "x" is a hexadecimal digit.
 * GUIDs are commonly used for unique identifiers and this function ensures that the `id` field in a
 * payload adheres to this format.
 *
 * @param {string} id - The ID string to be validated. This should be a GUID.
 * @returns {boolean} `true` if the `id` string matches the GUID format; otherwise, `false`.
 *
 * @example
 * // Example of a valid GUID
 * const validId = "123e4567-e89b-12d3-a456-426614174000";
 * console.log(isGetVCProfileByIdValid(validId)); // Output: true
 *
 * // Example of an invalid GUID
 * const invalidId = "not-a-valid-guid";
 * console.log(isGetVCProfileByIdValid(invalidId)); // Output: false
 */
export const isValidVCId = (id: string): boolean => {
  // GUID regex pattern
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  return guidRegex.test(id)
}
