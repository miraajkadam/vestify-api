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

/**
 * Checks if a given date string is a valid date.
 *
 * @param {string} dateString - The date string to be validated, expected in ISO 8601 format.
 *
 * @returns {boolean} - Returns true if the date string is valid; otherwise, false.
 */
export const isValidDateStr = (dateString: string): boolean => {
  const date = new Date(dateString)

  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * Checks if the given value is a valid JavaScript `Date` object.
 *
 * A valid `Date` object is one that represents a real date and not an invalid date (e.g., `new Date('invalid-date')`).
 * The function checks if the input is an instance of the `Date` class and if its `getTime()` method returns a valid number (not `NaN`).
 *
 * @param {Date} date - The value to be checked.
 * @returns {boolean} `true` if the input is a valid `Date` object, `false` otherwise.
 *
 * @example
 * const validDate = new Date('2024-12-01');
 * console.log(isValidDateObj(validDate));  // true
 *
 * const invalidDate = new Date('invalid-date');
 * console.log(isValidDateObj(invalidDate));  // false
 */
export const isValidDateObj = (date: Date): boolean =>
  date instanceof Date && !isNaN(date.getTime())
