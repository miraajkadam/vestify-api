import type { Decimal } from '@prisma/client/runtime/library'

import { isValidGuid } from '@/utils/common'
import { VCSocial } from '@prisma/client'
import {
  isValidXLink,
  isValidTwitterLink,
  isValidInstagramLink,
  isValidDiscordLink,
  isValidTelegramLink,
  isValidMediumLink,
  isValidYouTubeLink,
} from '@/utils/socialsValidator'

/**
 * Validates if the provided payload values meet the expected criteria for an AddNewVCPayload.
 *
 * @param {string} name - The name of the VC, which should be a non-empty string.
 * @param {string} description - A description of the VC, which should be a non-empty string.
 * @param {string} logoBase64 - A Base64-encoded string representing the logo, which should be a non-empty string.
 * @param {number} subscriptionFee - The subscription fee, which should be a non-negative number.
 * @param {string[]} tags - An array of tags associated with the VC, where each tag should be a non-empty string.
 * @param {boolean} kycDone - A boolean indicating whether KYC (Know Your Customer) verification is completed.
 * @param {Object} socials - The social media links associated with the VC.
 * @param {string|null} [socials.x] - Additional info (optional).
 * @param {string|null} [socials.instagram] - Instagram link (optional).
 * @param {string|null} [socials.discord] - Discord link (optional).
 * @param {string|null} [socials.telegram] - Telegram link (optional).
 * @param {string|null} [socials.medium] - Medium link (optional).
 * @param {string|null} [socials.youtube] - YouTube channel link (optional).
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
 *   true,
 *   {
 *     x: "Additional info",
 *     instagram: "https://instagram.com/sample_vc",
 *     discord: null,
 *     telegram: "https://t.me/sample_vc",
 *     medium: "https://medium.com/@sample_vc",
 *     youtube: ""
 *   }
 * );
 */
export const isAddNewVCPayloadValid = (
  accountId: string,
  name: string,
  description: string,
  logoBase64: string,
  subscriptionFee: Decimal,
  tags: string[],
  kycDone: boolean,
  socials: Omit<VCSocial, 'id' | 'vcId'>
): boolean => {
  //Check if account id is a valid guid
  if (!isValidGuid(accountId)) return false

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

  // Check if social links are valid
  const socialFields: (keyof Socials)[] = [
    'x',
    'instagram',
    'discord',
    'telegram',
    'medium',
    'youtube',
  ]

  for (const field of socialFields) {
    const value = socials[field]

    if (value !== undefined && value !== null && value !== '' && typeof value !== 'string')
      return false
  }

  if (socials.x && !isValidXLink(socials.x) && !isValidTwitterLink(socials.x)) return false
  if (socials.instagram && !isValidInstagramLink(socials.instagram)) return false
  if (socials.discord && !isValidDiscordLink(socials.discord)) return false
  if (socials.telegram && !isValidTelegramLink(socials.telegram)) return false
  if (socials.medium && !isValidMediumLink(socials.medium)) return false
  if (socials.youtube && !isValidYouTubeLink(socials.youtube)) return false

  return true
}

interface Socials {
  x?: string | null
  instagram?: string | null
  discord?: string | null
  telegram?: string | null
  medium?: string | null
  youtube?: string | null
}
