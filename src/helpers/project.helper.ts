import { ProjectRound } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

import {
  AddProjectApiPayload,
  ProjectDetailsResponse,
  ProjectProfileDbResponse,
} from '@/types/Project'
import { isValidDate, isValidGuid } from '@/utils/common'
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
 * Transforms a project profile from the database into the expected API response format.
 *
 * @param {ProjectProfileDbResponse} projectProfile - The project profile data received from the database.
 * @returns {ProjectProfileResponse} The formatted response object containing the project details, token metrics,
 *                  social links, team and advisors, and partners and investors.
 */
export const strProjForResponse = (projectProfile: ProjectProfileDbResponse) => ({
  project: {
    name: projectProfile.name,
    description: projectProfile.description,
    round: projectProfile.projectTokenMetrics[0].round,
    categories: projectProfile.categories,
    tokensReceived: '0/0',
  },
  tokenMetrics: projectProfile.projectTokenMetrics,
  socialLink: {
    medium: projectProfile?.projectSocials?.medium,
    website: projectProfile?.projectSocials?.website,
    x: projectProfile?.projectSocials?.x,
    telegram: projectProfile?.projectSocials?.telegram,
  },
  teamAndAdvisors: projectProfile?.projectTeamAndAdvisors,
  partnersAndInvestors: projectProfile?.projectPartnersAndInvestors,
})

/**
 * Transforms the project statistics into a structured response format.
 *
 * This function takes the raw project statistics and reformats them into a
 * more user-friendly structure, which includes project information, financial
 * details, token metrics, and investment information.
 *
 * @param {object} prjStats - The raw project statistics object, which should contain:
 * - projDet: An object containing project details (name, category, round, token metrics, deals).
 * - totInvestedAmt: The total amount invested in the project.
 *
 * @returns {object} A structured response object with the following properties:
 * - info: An object containing project information (name, category, round).
 * - financial: An object containing financial information (target, raised, percentAchieved).
 * - tokenMetric: An object containing token metrics (price).
 * - invest: An object containing investment details (maximumAmount, minimumAmount, poolFee, acceptedTokens).
 *
 * @example
 * const projectStats = {
 *   projDet: {
 *     name: "Project Alpha",
 *     category: "Technology",
 *     round: "Series A",
 *     projectTokenMetrics: {
 *       price: "0.1",
 *     },
 *     projectDeals: {
 *       maximum: "10000",
 *       minimum: "100",
 *       poolFee: 2,
 *       acceptedTokens: ["ETH", "BTC"],
 *     },
 *   },
 *   totInvestedAmt: 25000,
 * };
 *
 * const structuredResponse = strRespFrInvestmentStats(projectStats);
 * // structuredResponse will have the desired format for API response.
 */
export const strRespFrInvestmentStats = (prjStats: {
  projDet: {
    projectTokenMetrics: {
      round: ProjectRound
      price: string
    }
    name: string
    categories: string[]
    projectDeals: {
      maximum: Decimal
      minimum: Decimal
      acceptedTokens: string
      poolFee: Decimal
    }
  }
  totInvestedAmt: number | Decimal
}): ProjectDetailsResponse => ({
  info: {
    name: prjStats.projDet.name,
    categories: prjStats.projDet.categories,
    round: prjStats.projDet.projectTokenMetrics.round,
  },
  financial: {
    target: 50000,
    raised: +prjStats.totInvestedAmt,
    percentAchieved: (+prjStats.totInvestedAmt / 50000) * 100,
  },
  tokenMetric: {
    price: prjStats.projDet.projectTokenMetrics.price,
  },
  invest: {
    maximumAmount: prjStats.projDet.projectDeals.maximum,
    minimumAmount: prjStats.projDet.projectDeals.minimum,
    poolFee: prjStats.projDet.projectDeals.poolFee,
    acceptedTokens: prjStats.projDet.projectDeals.acceptedTokens,
  },
})

export const isAddNewProjectPayloadValid = (payload: AddProjectApiPayload) => {
  // Check 'info' object
  if (!payload.info || typeof payload.info !== 'object') return false

  const { name, categories, description, vcId } = payload.info

  if (
    typeof name !== 'string' ||
    !Array.isArray(categories) ||
    categories.length === 0 ||
    typeof description !== 'string' ||
    !isValidGuid(vcId)
  )
    return false

  // Validate categories
  if (!categories.every(cat => typeof cat === 'string')) return false

  // Check 'tokenMetrics' array
  if (!Array.isArray(payload.tokenMetrics) || !payload.tokenMetrics.length) return false

  for (const tokenMetric of payload.tokenMetrics) {
    if (typeof tokenMetric !== 'object' || !tokenMetric) return false

    const { fdv, price, tgeUnlock, tge, round, tgeSummary } = tokenMetric

    if (
      typeof fdv !== 'string' ||
      typeof price !== 'string' ||
      typeof tgeUnlock !== 'number' ||
      tgeUnlock < 0 ||
      tgeUnlock > 100 ||
      !isValidDate(tge) ||
      typeof round !== 'string' ||
      typeof tgeSummary !== 'string'
    )
      return false
  }

  // Check 'deals' object
  if (!payload.deals || typeof payload.deals !== 'object') return false

  const { maximum, minimum, acceptedTokens, poolFee, startDate, endDate } = payload.deals

  if (
    typeof maximum !== 'number' ||
    typeof minimum !== 'number' ||
    typeof acceptedTokens !== 'string' ||
    typeof poolFee !== 'number' ||
    !isValidDate(startDate) ||
    !isValidDate(endDate)
  )
    return false

  // Check 'teamAndAdvisors' array
  if (!Array.isArray(payload.teamAndAdvisors)) return false

  for (const member of payload.teamAndAdvisors) {
    if (typeof member !== 'object' || !member) return false

    const { description, name, title, imgBase64 } = member

    if (
      typeof description !== 'string' ||
      typeof name !== 'string' ||
      typeof title !== 'string' ||
      typeof imgBase64 !== 'string'
    )
      return false
  }

  // Check 'partnersAndInvestors' array
  if (!Array.isArray(payload.partnersAndInvestors)) return false

  for (const partner of payload.partnersAndInvestors) {
    if (typeof partner !== 'object' || !partner) return false

    const { logoBase64, name } = partner

    if (typeof logoBase64 !== 'string' || typeof name !== 'string') return false
  }

  // Check 'projectSocials' object
  if (!payload.projectSocials || typeof payload.projectSocials !== 'object') return false

  if (
    !payload.projectSocials.x ||
    (!isValidXLink(payload.projectSocials.x) && !isValidTwitterLink(payload.projectSocials.x))
  )
    return false
  if (!payload.projectSocials.telegram || !isValidTelegramLink(payload.projectSocials.telegram))
    return false
  if (!payload.projectSocials.website || !isValidWebsiteUrl(payload.projectSocials.website))
    return false

  if (payload.projectSocials.discord && !isValidDiscordLink(payload.projectSocials.discord))
    return false
  if (payload.projectSocials.medium && !isValidMediumLink(payload.projectSocials.medium))
    return false
  if (payload.projectSocials.youtube && !isValidYouTubeLink(payload.projectSocials.youtube))
    return false

  return true // If all checks passed
}
