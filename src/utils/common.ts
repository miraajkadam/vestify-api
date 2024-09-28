export enum NodeEnvironment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
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
 *
 * // Example of an invalid GUID
 * const invalidId = "not-a-valid-guid";
 */
export const isValidGuid = (id: string): boolean => {
  // GUID regex pattern
  const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

  return guidRegex.test(id)
}
