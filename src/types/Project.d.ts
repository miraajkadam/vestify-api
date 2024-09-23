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
    category: Projects['category']
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
  category: string
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
