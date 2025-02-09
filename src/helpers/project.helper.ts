import { ProjectRound, Release, VestingBatch } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

import { ProjectService } from '@/services'
import {
  AddDistributionPoolPayload,
  AddProjectApiPayload,
  AddressGroup,
  AddVestingSchedule,
  ProjectDetailsResponse,
  ProjectProfileDbResponse,
} from '@/types/Project'
import { isValidDateStr, isValidGuid } from '@/utils/common'
import { isValidISODate } from '@/utils/date'
import {
  isValidDiscordLink,
  isValidMediumLink,
  isValidTelegramLink,
  isValidTwitterLink,
  isValidWebsiteUrl,
  isValidXLink,
} from '@/utils/socialsValidator'
import { isValidWalletAddress } from '@/utils/web3'

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
    round: projectProfile.currentProjectTokenMetrics.round,
    categories: projectProfile.categories,
    tokensReceived: '0/0',
  },
  tokenMetrics: projectProfile.currentProjectTokenMetrics,
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
      price: Decimal
    }
    name: string
    categories: string[]
    projectRoundDetails: {
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
    maximumAmount: prjStats.projDet.projectRoundDetails.maximum,
    minimumAmount: prjStats.projDet.projectRoundDetails.minimum,
    poolFee: prjStats.projDet.projectRoundDetails.poolFee,
    acceptedTokens: prjStats.projDet.projectRoundDetails.acceptedTokens,
  },
})

/**
 * Validates the structure and data types of the provided `AddProjectApiPayload` object.
 *
 * This function checks that all required fields in the `payload` object conform to expected types,
 * that nested objects and arrays contain valid values, and that the project-specific values are valid
 * (e.g., checking if the dates are in the correct format, ensuring that fields like `fdv`, `price`, etc. are numbers, etc.).
 * If any of the fields are invalid, the function returns `false`. If all checks pass, it returns `true`.
 *
 * @param {AddProjectApiPayload} payload - The payload object to be validated. This object should conform to the structure defined in the `AddProjectApiPayload` type.
 *
 * @returns {boolean} `true` if the `payload` is valid, `false` otherwise.
 *
 * @throws {Error} Throws an error if the payload object does not conform to the expected structure or contains invalid data.
 *
 * @example
 * const validPayload = {
 *   info: {
 *     name: 'New Project',
 *     categories: ['Tech', 'Blockchain'],
 *     description: 'A great project.',
 *     vcId: 'some-vc-id'
 *   },
 *   roundDetails: {
 *     maximum: 1000000,
 *     minimum: 50000,
 *     acceptedTokens: 'ETH',
 *     poolFee: 1.5,
 *     startDate: '2024-12-01',
 *     endDate: '2024-12-31',
 *     raiseAmount: 500000,
 *     tokenTicker: 'NP'
 *   },
 *   pastProjTokenMetrics: [...],
 *   curProjTokenMetrics: { ... },
 *   teamAndAdvisors: [...],
 *   partnersAndInvestors: [...],
 *   projectSocials: { ... }
 * };
 *
 * console.log(isAddNewProjectPayloadValid(validPayload));  // true
 *
 * const invalidPayload = { ... }; // An invalid payload with incorrect data
 * console.log(isAddNewProjectPayloadValid(invalidPayload));  // false
 */
export const isAddNewProjectPayloadValid = (payload: AddProjectApiPayload): boolean => {
  // check on chain projectId
  if (!payload.onChain || typeof payload.onChain !== 'object') return false

  const { projectId } = payload.onChain
  if (!projectId || typeof projectId !== 'string') return false

  // Check 'info' object
  if (!payload.info || typeof payload.info !== 'object') return false

  const { name, categories, description, vcId } = payload.info

  // Validate info object fields
  if (
    typeof name !== 'string' ||
    !Array.isArray(categories) ||
    categories.length === 0 ||
    !categories.every(cat => typeof cat === 'string') || // Ensure all categories are strings
    typeof description !== 'string' ||
    !isValidGuid(vcId)
  )
    return false

  // Validate 'roundDetails' object
  if (!payload.roundDetails || typeof payload.roundDetails !== 'object') return false

  const {
    maximum,
    minimum,
    acceptedTokens,
    poolFee,
    startDate,
    endDate,
    raiseAmount,
    tokenTicker,
  } = payload.roundDetails

  if (
    typeof maximum !== 'number' ||
    typeof minimum !== 'number' ||
    typeof acceptedTokens !== 'string' ||
    typeof poolFee !== 'number' ||
    !isValidDateStr(startDate) ||
    !isValidDateStr(endDate) ||
    typeof raiseAmount !== 'number' || // raiseAmount should be a number
    typeof tokenTicker !== 'string' // tokenTicker should be a string
  )
    return false

  // Validate 'pastProjTokenMetrics' array
  if (!Array.isArray(payload.pastProjTokenMetrics)) return false

  for (const tokenMetric of payload.pastProjTokenMetrics) {
    if (typeof tokenMetric !== 'object' || !tokenMetric) return false

    const { round, price, lockupPeriod, releaseType, releaseMonths } = tokenMetric

    if (
      typeof round !== 'string' ||
      typeof price !== 'number' ||
      typeof lockupPeriod !== 'number' ||
      typeof releaseType !== 'string' ||
      typeof releaseMonths !== 'number'
    )
      return false
  }

  // Validate 'curProjTokenMetrics' object
  if (!payload.curProjTokenMetrics || typeof payload.curProjTokenMetrics !== 'object') return false

  const { fdv, price, tgeUnlock, tge, round, lockupPeriod, releaseType, releaseMonths } =
    payload.curProjTokenMetrics

  if (
    typeof fdv !== 'number' ||
    typeof price !== 'number' ||
    typeof tgeUnlock !== 'number' ||
    tgeUnlock < 0 ||
    tgeUnlock > 100 ||
    !isValidDateStr(tge) ||
    typeof round !== 'string' ||
    typeof lockupPeriod !== 'number' ||
    typeof releaseType !== 'string' ||
    typeof releaseMonths !== 'number'
  )
    return false

  if (!isValidReleases(releaseType, releaseMonths)) return false

  // Validate 'teamAndAdvisors' array
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

  // Validate 'partnersAndInvestors' array
  if (!Array.isArray(payload.partnersAndInvestors)) return false

  for (const partner of payload.partnersAndInvestors) {
    if (typeof partner !== 'object' || !partner) return false

    const { logoBase64, name } = partner

    if (typeof logoBase64 !== 'string' || typeof name !== 'string') return false
  }

  // Validate 'projectSocials' object
  if (!payload.projectSocials || typeof payload.projectSocials !== 'object') return false

  const { x, telegram, website, discord, medium } = payload.projectSocials

  if (
    !x ||
    (!isValidXLink(x) && !isValidTwitterLink(x)) || // Assuming isValidXLink and isValidTwitterLink are defined
    !telegram ||
    !isValidTelegramLink(telegram) || // Assuming isValidTelegramLink is defined
    !website ||
    !isValidWebsiteUrl(website) || // Assuming isValidWebsiteUrl is defined
    (discord && !isValidDiscordLink(discord)) || // Assuming isValidDiscordLink is defined
    (medium && !isValidMediumLink(medium)) // Assuming isValidMediumLink is defined
  )
    return false

  // Validate 'projectWallet' object
  if (!payload.projectWallet || typeof payload.projectWallet !== 'object') return false

  const { chain, walletAddress } = payload.projectWallet
  if (!isValidWalletAddress(chain, walletAddress)) return false

  return true
}

export const isValidReleases = (releaseType: string, releaseMonths: number) => {
  if (
    releaseType !== Release.LINEAR &&
    releaseType !== Release.QUARTERLY &&
    releaseType !== Release.YEARLY
  )
    return false

  if (releaseType === Release.QUARTERLY && releaseMonths % 3 !== 0) {
    return false
  } else if (releaseType === Release.YEARLY && releaseMonths % 12 !== 0) {
    return false
  }

  return true
}

export const createVestingSchedules = async (
  pService: ProjectService,
  projectId: string,
  lockupPeriod: number,
  releaseMonths: number,
  tge: string,
  tgeUnlock: number,
  releaseType: Release
) => {
  const batches = [] as {
    name: VestingBatch['name']
    date: VestingBatch['date']
    percentage: number
  }[]

  const firstBatch = {
    name: 'TGE',
    date: new Date(tge),
    percentage: tgeUnlock,
  }

  batches.push(firstBatch)

  const remainingBatches = getRemainingBatches(
    tge,
    tgeUnlock,
    releaseMonths,
    lockupPeriod,
    releaseType
  )

  batches.push(...remainingBatches)

  return pService.createVestingSchedulesInDb(batches, releaseType, projectId)
}

const getRemainingBatches = (
  tge: string,
  tgeUnlock: number,
  releaseMonths: number,
  lockupPeriod: number,
  releaseType: Release
) => {
  const remainingPercentage = 100 - tgeUnlock

  let remBatchesCount: number, batchPercentage: number, increment: number

  switch (releaseType) {
    case Release.LINEAR: {
      remBatchesCount = releaseMonths
      batchPercentage = remainingPercentage / remBatchesCount
      increment = 1

      break
    }
    case Release.QUARTERLY: {
      remBatchesCount = releaseMonths / 3
      batchPercentage = remainingPercentage / remBatchesCount
      increment = 3

      break
    }
    case Release.YEARLY: {
      remBatchesCount = releaseMonths / 12
      batchPercentage = remainingPercentage / remBatchesCount
      increment = 12

      break
    }
  }

  const tgeDate = new Date(tge)
  const batches = []
  let tempDate = tgeDate.setMonth(tgeDate.getMonth() + lockupPeriod)

  for (let i = 0; i < remBatchesCount; i++) {
    const batch = {
      name: `Batch ${i + 1}`,
      date: new Date(tempDate),
      percentage: batchPercentage,
    }

    batches.push(batch)

    tempDate = tgeDate.setMonth(tgeDate.getMonth() + increment)
  }

  return batches
}

// #region vesting batches
/**
 * Validates if the provided project ID is a non-empty string.
 *
 * This function checks whether the input `projectId` is a string and ensures it is not an empty or whitespace-only string.
 *
 * @param {string} projectId - The project ID to validate.
 * @returns {boolean} - Returns `true` if the project ID is a non-empty, valid string, otherwise `false`.
 *
 * @example
 * validateProjectId('0xb12366ds'); // returns true
 * validateProjectId('');           // returns false
 * validateProjectId('   ');        // returns false
 * validateProjectId(null);         // TypeScript will show an error, as `projectId` should be a string
 */
export const validateProjectId = (projectId: string): boolean =>
  typeof projectId === 'string' && projectId.trim().length > 0

export const isVestingScheduleValid = (payload: AddVestingSchedule) => {
  // Step 1: Validate 'batchInterval' field
  const validIntervals = ['MONTHLY', 'QUARTERLY', 'ANNUALLY']
  if (!payload.batchInterval || !validIntervals.includes(payload.batchInterval)) {
    return false
  }

  // Step 2: Validate 'vestingBatches' array
  if (!Array.isArray(payload.vestingBatches) || payload.vestingBatches.length === 0) {
    return false
  }

  let totalPercentage = 0 // To keep track of the total percentage
  let previousDate = null // To store the date of the previous batch for comparison

  // Step 3: Validate each vesting batch
  for (const batch of payload.vestingBatches) {
    if (typeof batch !== 'object' || !batch) {
      return false
    }

    const { name, date, percentage } = batch

    // Validate 'name' - should be a string
    if (typeof name !== 'string' || name.trim() === '') {
      return false
    }

    // Validate 'date' - should be a valid ISO 8601 date string
    if (!isValidISODate(date)) {
      return false
    }

    // Check if dates are in incremental order
    if (previousDate && new Date(date) <= new Date(previousDate)) {
      return false // The current date must be later than the previous date
    }

    // Validate 'percentage' - should be a number between 0 and 100
    if (typeof percentage !== 'number' || percentage < 0 || percentage > 100) {
      return false
    }

    // Add the current batch's percentage to the total
    totalPercentage += percentage

    // Update previousDate for the next iteration
    previousDate = date
  }

  // Step 4: Check if the total percentage is exactly 100
  if (totalPercentage !== 100) {
    return false
  }

  return true
}
//#endregion

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
 * @param {string} payload.pId - The ID of the Project associated with the pool.
 *
 * @returns {boolean} - Returns `true` if the payload is valid, otherwise `false`.
 */
export const validateAddDistributionPoolPayload = (
  name: AddDistributionPoolPayload['name'],
  addresses: AddDistributionPoolPayload['addresses'],
  fee: AddDistributionPoolPayload['fee'],
  maxAllocation: AddDistributionPoolPayload['maxAllocation'],
  minAllocation: AddDistributionPoolPayload['minAllocation'],
  pId: AddDistributionPoolPayload['projectId'],
  isEdit: boolean
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

  // check P ID
  if (!isEdit && (!pId || typeof pId !== 'string')) return false

  return true
}

/**
 * Retrieves the distribution pools for a project, including main investors' wallets.
 *
 * This function fetches the distribution pools and project investors (main investors) from the database,
 * then merges the main investors' wallet addresses with the distribution pools. It returns an array of
 * address groups containing the addresses of the main investors and any distribution pools associated with
 * the given project.
 *
 * @async
 * @function getProjectDistributionPools
 * @param {string} projectId - The unique identifier of the project.
 * @returns {Promise<AddressGroup[]>} - A promise that resolves to an array of address groups, each containing a list of wallet addresses and their associated pool names.
 *
 * @example
 * // Example usage
 * const projectId = 'c87b0321-f22e-4bc6-929d-3a42fec2e227';
 * const distributionPools = await getProjectDistributionPools(projectId);
 * console.log(distributionPools);
 *
 * @throws {Error} Throws an error if there is an issue retrieving data from the database or merging the data.
 */
export const getProjectDistributionPools = async (projectId: string): Promise<AddressGroup[]> => {
  const pService = new ProjectService()

  const [distPools, mainInvPool] = await Promise.all([
    pService.getDistributionPoolsFromDb(projectId),
    await pService.getProjectInvestors(projectId),
  ])

  const flattenedAddresses = mainInvPool.flatMap(item =>
    item.user.account.wallets.map(wallet => wallet.address)
  )

  const merge = {
    ...distPools,
    mains: { name: 'Main Investors', addresses: flattenedAddresses },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any

  return Object.values(merge)
}

export const validateDistPoolsDetailsParams = (distPoolId: string) => {
  const validDistPoolId = isValidGuid(distPoolId)

  if (!validDistPoolId) return false

  return true
}
// #endregion
