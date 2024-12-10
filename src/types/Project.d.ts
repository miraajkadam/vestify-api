import type {
  CurrentProjectTokenMetrics,
  DistributionPool,
  PastProjectTokenMetrics,
  ProjectDeals,
  ProjectPartnersAndInvestors,
  ProjectRound,
  ProjectRoundDetails,
  Projects,
  ProjectSocials,
  ProjectTeamAndAdvisors,
  ProjectTokenMetrics,
  ProjectWallet,
  VC,
} from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

// region AddProject

type ProjectInfo = {
  name: Projects['name']
  categories: Projects['categories']
  description: Projects['description']
  vcId: VC['id']
}

type CurProjTokenMetrics = {
  round: CurrentProjectTokenMetrics['round']
  fdv: CurrentProjectTokenMetrics['fdv']
  price: CurrentProjectTokenMetrics['price']
  tgeUnlock: CurrentProjectTokenMetrics['tgeUnlock']
  tge: string // ISO Date Strings
  lockupPeriod: CurrentProjectTokenMetrics['lockupPeriod']
  releaseType: CurrentProjectTokenMetrics['releaseType']
  releaseMonths: CurrentProjectTokenMetrics['releaseMonths']
}

type PstProjectTokenMetrics = {
  round: PastProjectTokenMetrics['round']
  price: PastProjectTokenMetrics['price']
  lockupPeriod: PastProjectTokenMetrics['lockupPeriod']
  releaseType: PastProjectTokenMetrics['releaseType']
  releaseMonths: PastProjectTokenMetrics['releaseMonths']
}

type RoundDetails = {
  maximum: ProjectRoundDetails['maximum']
  minimum: ProjectRoundDetails['minimum']
  acceptedTokens: ProjectRoundDetails['acceptedTokens']
  poolFee: ProjectRoundDetails['poolFee']
  startDate: string // ISO Date Strings
  endDate: string // ISO Date Strings
  raiseAmount: ProjectDetailsResponse['raiseAmount']
  tokenTicker: ProjectDetailsResponse['tokenTicker']
}

type ProjWalletSetup = {
  chain: ProjectWallet['chain']
  walletAddress: ProjectWallet['walletAddress']
}

type TeamAndAdvisor = {
  description: ProjectTeamAndAdvisors['description']
  name: ProjectTeamAndAdvisors['name']
  title: ProjectTeamAndAdvisors['title']
  imgBase64: ProjectTeamAndAdvisors['imgBase64']
}

type PartnerAndInvestor = {
  logoBase64: ProjectPartnersAndInvestors['logoBase64']
  name: ProjectPartnersAndInvestors['name']
}

type OnChainProjectData = {
  projectId: string
}

export type AddProjectApiPayload = {
  info: ProjectInfo
  roundDetails: RoundDetails
  pastProjTokenMetrics: PstProjectTokenMetrics[]
  curProjTokenMetrics: CurProjTokenMetrics
  teamAndAdvisors: TeamAndAdvisor[]
  partnersAndInvestors: PartnerAndInvestor[]
  projectSocials: ProjectSocials
  projectWallet: ProjWalletSetup
  onChain: OnChainProjectData
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
  tokenMetrics: Omit<ProjectTokenMetrics, 'id' | 'projectId'>
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
  name: Projects['name']
  description: Projects['description']
  categories: Projects['categories']
  currentProjectTokenMetrics: {
    tge: Date
    tgeUnlock: ProjectTokenMetrics['tgeUnlock']
    price: Decimal
    round: ProjectRound
    fdv: Decimal
  }
  projectSocials: {
    website: string
    medium: string | null
    telegram: string
    x: string
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

// #region Distribution pools
export type AddDistributionPoolPayload = {
  name: DistributionPool['name']
  addresses: DistributionPool['addresses']
  fee: DistributionPool['fee']
  maxAllocation: DistributionPool['maxAllocation']
  minAllocation: DistributionPool['minAllocation']
  projectId: Projects['id']
}

export type AddDistributionPoolResponse = DistributionPool['id']
// #endregion
