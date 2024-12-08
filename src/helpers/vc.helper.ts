import { Interval, VCSocial } from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'

import { AddDistributionPoolPayload, VCProfileResponse } from '@/types/VC'
import { isValidGuid } from '@/utils/common'
import {
  isValidDiscordLink,
  isValidMediumLink,
  isValidTelegramLink,
  isValidTwitterLink,
  isValidWebsiteUrl,
  isValidXLink,
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
 * @param {string} [socials.x] - X Link.
 * @param {string|null} [socials.discord] - Discord link (optional).
 * @param {string} [socials.telegram] - Telegram link.
 * @param {string|null} [socials.medium] - Medium link (optional).
 * @param {string|null} [socials.youtube] - YouTube channel link (optional).
 * @param {string} [socials.website] - Website link.
 *
 * @returns {boolean} Returns `true` if all parameters meet their respective validation criteria, otherwise `false`.
 *
 * @example
 * const isValid = isAddNewVCPayloadValid(
 *   "Sample VC",
 *   "This is a sample VC",
 *   "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",
 *   99.99,
 *   "MONTHLY",
 *   ["tag1", "tag2"],
 *   true,
 *   {
 *     x: "Additional info",
 *     discord: null,
 *     telegram: "https://t.me/sample_vc",
 *     medium: "https://medium.com/@sample_vc",
 *     youtube: "",
 *     website: "https://www.website.com/in/firstname-lastname",
 *   }
 * );
 */
export const isAddNewVCPayloadValid = (
  accountId: string,
  name: string,
  description: string,
  logoBase64: string,
  subscriptionFee: Decimal,
  payloadSubscriptionRenewalInterval: Interval,
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

  // Check if subscriptionRenewalInterval is one of the allowed values: 'MONTHLY', 'QUARTERLY', 'ANNUALLY'
  if (!subscriptionRenewalIntervals.includes(payloadSubscriptionRenewalInterval)) return false

  // Check if tags is an array of non-empty strings
  if (!Array.isArray(tags) || !tags.every(tag => typeof tag === 'string' && tag.trim().length > 0))
    return false

  // Check if kycDone is a boolean
  if (typeof kycDone !== 'boolean') return false

  // Check if social links are valid
  const socialFields: (keyof Socials)[] = [
    'x',
    'discord',
    'telegram',
    'medium',
    'youtube',
    'website',
  ]

  for (const field of socialFields) {
    const value = socials[field]

    if (value !== undefined && value !== null && value !== '' && typeof value !== 'string')
      return false
  }

  if (!socials.x || (!isValidXLink(socials.x) && !isValidTwitterLink(socials.x))) return false
  if (!socials.website || !isValidWebsiteUrl(socials.website)) return false
  if (!socials.telegram || !isValidTelegramLink(socials.telegram)) return false

  if (socials.discord && !isValidDiscordLink(socials.discord)) return false
  if (socials.youtube && !isValidYouTubeLink(socials.youtube)) return false
  if (socials.medium && !isValidMediumLink(socials.medium)) return false

  return true
}

export const sanitizeVCProfileForResponse = (vcDetails: {
  vcId: string
  id: string
  name: string
  VCSocial: {
    x: string
    discord: string | null
    telegram: string
    website: string
  }
  description: string
  logoBase64: string
  subscriptionFee: Decimal
  tags: string[]
  kycDone: boolean
  projects: { id: string; name: string }[]
}): VCProfileResponse => {
  const { VCSocial, ...rest } = vcDetails // Destructure to separate VCSocial

  return { ...rest, social: VCSocial, vcId: vcDetails.id } // Rename and return
}

// #region distribution pools
/**
 * Validates the payload for adding a new distribution pool.
 *
 * This function checks the following conditions:
 * 1. `name` must be a non-empty string.
 * 2. `addresses` must be an array of non-empty strings.
 * 3. `fee`, `maxAllocation`, and `minAllocation` must be valid numbers.
 * 4. `fee` must be a non-negative number.
 * 5. `maxAllocation` and `minAllocation` must be positive numbers, and `maxAllocation` must be greater than `minAllocation`.
 *
 * @param {Object} payload - The payload containing the distribution pool data.
 * @param {string} payload.name - The name of the distribution pool.
 * @param {string[]} payload.addresses - The list of addresses associated with the pool.
 * @param {number} payload.fee - The fee for the distribution pool (must be a non-negative number).
 * @param {number} payload.maxAllocation - The maximum allocation allowed for the pool (must be a positive number).
 * @param {number} payload.minAllocation - The minimum allocation allowed for the pool (must be a positive number).
 * @param {string} payload.vcId - The ID of the VC associated with the pool.
 *
 * @returns {boolean} - Returns `true` if the payload is valid, otherwise `false`.
 */
export const isAddDistributionPoolPayloadValid = (
  name: AddDistributionPoolPayload['name'],
  addresses: AddDistributionPoolPayload['addresses'],
  fee: AddDistributionPoolPayload['fee'],
  maxAllocation: AddDistributionPoolPayload['maxAllocation'],
  minAllocation: AddDistributionPoolPayload['minAllocation'],
  vcId: AddDistributionPoolPayload['vcId']
): boolean => {
  // Check if name is a non-empty string
  if (typeof name !== 'string' || name.trim().length === 0) return false

  // Check if addresses is an array of non-empty strings
  if (
    !Array.isArray(addresses) ||
    !addresses.every(address => typeof address === 'string' && address.trim().length > 0)
  )
    return false

  // Check if fee, maxAllocation, and minAllocation are valid numbers
  if (typeof fee !== 'number' || isNaN(fee)) return false
  if (typeof maxAllocation !== 'number' || isNaN(maxAllocation)) return false
  if (typeof minAllocation !== 'number' || isNaN(minAllocation)) return false

  // Check if fee is non-negative
  if (fee < 0) return false

  // Check if maxAllocation and minAllocation are positive numbers and maxAllocation is greater than minAllocation
  if (maxAllocation <= 0 || minAllocation <= 0) return false
  if (maxAllocation < minAllocation) return false

  // check VC ID
  if (!isValidGuid(vcId)) return false

  return true
}
// #endregion

interface Socials {
  x: string
  website: string
  telegram: string
  discord?: string | null
  medium?: string | null
  youtube?: string | null
}

export const subscriptionRenewalIntervals = ['MONTHLY', 'QUARTERLY', 'ANNUALLY'] as const
