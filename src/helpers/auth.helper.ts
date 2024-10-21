import { AccountType } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'
import { isEmail, isStrongPassword } from 'validator'

const SALT_ROUNDS = 10

/**
 * Validates the signup payload for a user.
 *
 * @param {string} username - The username of the user. Must be a non-empty string.
 * @param {string} email - The email address of the user. Must be a valid email format.
 * @param {string} password - The password chosen by the user. Must meet strength requirements.
 * @param {AccountType} accountType - The type of account the user is signing up for. Must be either AccountType.VC or AccountType.USER.
 *
 * @returns {boolean} - Returns true if all validations pass, otherwise false.
 *
 * @example
 * const isValid = validateSignupPayload('user123', 'user@example.com', 'StrongP@ssw0rd!', AccountType.USER);
 * console.log(isValid); // true
 *
 * @see https://github.com/validatorjs/validator.js?tab=readme-ov-file#validators for isStrongPassword and isEmail
 * For password policy, We're using default params
 */
export const validateSignupPayload = (
  username: string,
  email: string,
  password: string,
  accountType: AccountType
): boolean => {
  if (!username || typeof username !== 'string') return false

  if (!email || typeof email !== 'string' || !isEmail(email)) return false

  if (!password || typeof password !== 'string' || !isStrongPassword(password)) return false

  if (accountType !== AccountType.VC && accountType !== AccountType.USER) return false

  return true
}

/**
 * Generates a cryptographic hash of the given password using a generated salt.
 *
 * @async
 *
 * @param {string} password - The plaintext password to be hashed.
 *
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 *
 * @throws {Error} - Throws an error if hashing fails.
 *
 * @example
 * const hashedPassword = await getCrypticPassword('mySecurePassword');
 * console.log(hashedPassword); // Outputs the hashed password
 */
export const getCrypticPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(SALT_ROUNDS)
  const hashedPassword = await hash(password, salt)

  return hashedPassword
}
