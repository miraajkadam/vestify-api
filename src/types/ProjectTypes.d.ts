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
