import { ProjectProfileDbResponse } from '@/types/Project'

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
    round: projectProfile.round,
    categories: projectProfile.categories,
    tokensReceived: '0/0',
  },
  token: {
    allocation: projectProfile?.projectTokenMetrics?.allocation,
    vesting: projectProfile?.projectTokenMetrics?.vesting,
    tge: projectProfile?.projectTokenMetrics?.tge,
    tgeUnlock: projectProfile?.projectTokenMetrics?.tgeUnlock,
    price: projectProfile?.projectTokenMetrics?.price,
  },
  socialLink: {
    medium: projectProfile?.projectSocials?.medium,
    discord: projectProfile?.projectSocials?.discord,
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const strRespFrInvestmentStats = (prjStats: any) => ({
  info: {
    name: prjStats.projDet.name,
    categories: prjStats.projDet.categories,
    round: prjStats.projDet.round,
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
