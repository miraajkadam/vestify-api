import { ProjectProfileDbResponse } from '@/types/ProjectTypes'

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
    category: projectProfile.category,
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
