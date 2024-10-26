import * as jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface JwtPayload extends jwt.JwtPayload {
    user: {
      id: string
    }
  }
}

/**
 * Represents the result of pre-checks.
 *
 * @typedef {Object} SuccessPreChecks
 * @property {boolean} error - Indicates if there was no error (always false).
 */
type SuccessPreChecks = {
  error: false
}

/**
 * Represents a failed result of pre-checks.
 *
 * @typedef {Object} FailedPreChecks
 * @property {boolean} error - Indicates that there was an error (always true).
 * @property {string} httpMessage - A message describing the error.
 * @property {number} httpStatusCode - The HTTP status code corresponding to the error.
 */
type FailedPreChecks = {
  error: true
  httpMessage: string
  httpStatusCode: number
}

/**
 * Represents the result of pre-checks, which can either be successful or failed.
 *
 * @typedef {SuccessPreChecks | FailedPreChecks} PreChecks
 */
export type PreChecks = SuccessPreChecks | FailedPreChecks
