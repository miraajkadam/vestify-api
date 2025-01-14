/**
 * Checks if the provided date is older than one month compared to the current date.
 *
 * This function compares the given date with the current date minus one month.
 * If the provided date is earlier than one month ago, it returns `true`; otherwise, it returns `false`.
 *
 * @function isOlderThanOneMonth
 * @param {Date} date - The date to compare with the current date.
 *
 * @returns {boolean} `true` if the provided date is older than one month, otherwise `false`.
 */
export const isOlderThanOneMonth = (date: Date) => {
  const currentDate = new Date() // Get current date
  const oneMonthAgo = new Date()
  oneMonthAgo.setMonth(currentDate.getMonth() - 1) // Subtract 1 month

  // Compare the provided date with one month ago
  return date < oneMonthAgo
}

/**
 * Checks if the provided date is older than one quarter (three months) compared to the current date.
 *
 * This function compares the given date with the current date minus three months.
 * If the provided date is earlier than three months ago, it returns `true`; otherwise, it returns `false`.
 *
 * @function isOlderThanOneQuarter
 * @param {Date} date - The date to compare with the current date.
 *
 * @returns {boolean} `true` if the provided date is older than one quarter (three months), otherwise `false`.
 */
export const isOlderThanOneQuarter = (date: Date) => {
  const currentDate = new Date() // Current date
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(currentDate.getMonth() - 3) // Subtract 3 months

  // Compare the provided date with three months ago
  return date < threeMonthsAgo
}

/**
 * Checks if the provided date is older than one year compared to the current date.
 *
 * This function compares the given date with the current date minus one year.
 * If the provided date is earlier than one year ago, it returns `true`; otherwise, it returns `false`.
 *
 * @function isOlderThanOneYear
 * @param {Date} date - The date to compare with the current date.
 *
 * @returns {boolean} `true` if the provided date is older than one year, otherwise `false`.
 */
export const isOlderThanOneYear = (date: Date) => {
  const currentDate = new Date() // Current date
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(currentDate.getFullYear() - 1) // Subtract 1 year

  // Compare the provided date with one year ago
  return date < oneYearAgo
}

/**
 * Validates if the given date string is a valid ISO 8601 date.
 *
 * This function checks if the provided date string can be parsed by JavaScript's `Date` object
 * and if the result is a valid date. It ensures the date is in ISO 8601 format (e.g., "2025-01-01T00:00:00.000Z").
 *
 * @param {string} dateStr - The date string to be validated.
 * @returns {boolean} `true` if the date is valid, `false` otherwise.
 */
export const isValidISODate = (dateStr: string): boolean => {
  const parsedDate = Date.parse(dateStr)

  // Check if the parsed date is a valid date
  if (isNaN(parsedDate)) {
    return false
  }

  // Ensure that the date string matches the ISO 8601 format
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/

  return isoRegex.test(dateStr)
}
