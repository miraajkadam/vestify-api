import type { ProjectRound } from '@prisma/client'

import type {
  ProjectDeals,
  ProjectPartnersAndInvestors,
  Projects,
  ProjectSocials,
  ProjectTeamAndAdvisors,
  ProjectTokenMetrics,
} from '@prisma/client'

// region AddProject

type ProjectInfo = {
  name: string
  categories: string[]
  description: string
  vcId: string
}

type TokenMetric = {
  fdv: string
  price: string
  tgeUnlock: string
  tge: string // ISO 8601 date string
  round: ProjectRound
  tgeSummary: string
}

type Deals = {
  maximum: number
  minimum: number
  acceptedTokens: string
  poolFee: number
  startDate: string // ISO 8601 date string
  endDate: string // ISO 8601 date string
}

type TeamAndAdvisor = {
  description: string
  name: string
  title: string
  imgBase64: string
}

type PartnerAndInvestor = {
  logoBase64: string
  name: string
}

type ProjectSocials = {
  x: string | null
  instagram: string | null
  discord: string | null
  telegram: string | null
  medium: string | null
  youtube: string | null
}

export type AddProjectApiPayload = {
  info: ProjectInfo
  tokenMetrics: TokenMetric[]
  deals: Deals
  teamAndAdvisors: TeamAndAdvisor[]
  partnersAndInvestors: PartnerAndInvestor[]
  projectSocials: ProjectSocials
}

// endregion

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
    round: ProjectRound
    categories: Projects['category']
  }
  token: {
    tge: ProjectTokenMetrics['tge']
    tgeUnlock: ProjectTokenMetrics['tgeUnlock']
    price: ProjectTokenMetrics['price']
    tgeSummary: ProjectTokenMetrics['tgeSummary']
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
  categories: string[]
  projectTokenMetrics: {
    tge: Date
    tgeUnlock: string
    price: string
    round: ProjectRound
    tgeSummary: string
  }

  projectSocials: {
    discord: string | null
    medium: string | null
    telegram: string | null
    x: string | null
  }
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
type ProjectInfoInv = {
  name: Projects['name']
  categories: Projects['categories']
  round: ProjectRound
}

type Financial = {
  target: number
  raised: number
  percentAchieved: number
}

type TokenMetricInv = {
  price: ProjectTokenMetrics['price'] // Assuming price can be a large number in string format
}

type InvestmentDetails = {
  maximumAmount: ProjectDeals['maximum'] // Keeping it as string for large values
  minimumAmount: ProjectDeals['minimum']
  poolFee: ProjectDeals['poolFee']
  acceptedTokens: ProjectDeals['acceptedTokens'] // Could also define a union of accepted token types if needed
}

type ProjectDetailsResponse = {
  info: ProjectInfoInv
  financial: Financial
  tokenMetric: TokenMetricInv
  invest: InvestmentDetails
}
//#endregion
