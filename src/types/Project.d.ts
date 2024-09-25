import type { ProjectRound } from '@prisma/client'

import type {
  ProjectDeals,
  ProjectPartnersAndInvestors,
  Projects,
  ProjectSocials,
  ProjectTeamAndAdvisors,
  ProjectTokenMetrics,
} from '@prisma/client'

export type AddProjectApiPayload = {
  info: Omit<Projects, 'id'>
  tokenMetrics: Omit<ProjectTokenMetrics, 'id' | 'projectId'>
  deals: Omit<ProjectDeals, 'id' | 'projectId'>
  teamAndAdvisors: Omit<ProjectTeamAndAdvisors, 'id' | 'projectId'>[]
  partnersAndInvestors: Omit<ProjectPartnersAndInvestors, 'id' | 'projectId'>[]
  projectSocials: Omit<ProjectSocials, 'id' | 'projectId'>
}

export type DeleteProjectApiPayload = {
  id: string
}

export type ProjectListResponse = {
  name: string
  description: string
  round: ProjectRound
}[]

export type ProjectProfileResponse = {
  info: {
    name: Projects['name']
    description: Projects['description']
    round: Projects['round']
    categories: Projects['category']
  }
  token: {
    allocation: ProjectTokenMetrics['allocation']
    vesting: ProjectTokenMetrics['vesting']
    tge: ProjectTokenMetrics['tge']
    tgeUnlock: ProjectTokenMetrics['tgeUnlock']
    price: ProjectTokenMetrics['price']
  }
  socialLink: {
    medium: ProjectSocials['medium']
    discord: ProjectSocials['discord']
    x: ProjectSocials['x']
    telegram: ProjectSocials['telegram']
  }
  teamAndAdvisors: {
    name: ProjectTeamAndAdvisors['name']
    title: ProjectTeamAndAdvisors['title']
    imgBase64: ProjectTeamAndAdvisors['imgBase64']
  }[]
  partnersAndInvestors: {
    name: ProjectPartnersAndInvestors['name']
    logoBase64: ProjectPartnersAndInvestors['logoBase64']
  }[]
}

export type ProjectProfileDbResponse = {
  name: string
  description: string
  round: string
  categories: string[]
  projectTokenMetrics: {
    allocation: string
    vesting: Date
    tge: Date
    tgeUnlock: string
    price: string
  } | null
  projectSocials: {
    discord: string | null
    medium: string | null
    telegram: string | null
    x: string | null
  } | null
  projectTeamAndAdvisors: {
    name: string
    imgBase64: string | null
  }[]

  projectPartnersAndInvestors: {
    name: string
    logoBase64: string | null
  }[]
}

//#region Project Investment Stats
type ProjectInfo = {
  name: Projects['name']
  categories: Projects['categories']
  round: Projects['round']
}

type Financial = {
  target: number
  raised: number
  percentAchieved: number
}

type TokenMetric = {
  price: ProjectTokenMetrics['price'] // Assuming price can be a large number in string format
}

type InvestmentDetails = {
  maximumAmount: ProjectDeals['maximum'] // Keeping it as string for large values
  minimumAmount: ProjectDeals['minimum']
  poolFee: ProjectDeals['poolFee']
  acceptedTokens: ProjectDeals['acceptedTokens'] // Could also define a union of accepted token types if needed
}

type ProjectDetailsResponse = {
  info: ProjectInfo
  financial: Financial
  tokenMetric: TokenMetric
  invest: InvestmentDetails
}
//#endregion
