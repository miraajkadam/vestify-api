import type { ProjectRound, VCSocial } from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'

export type AddNewVCPayload = {
  id: string
  name: string
  description: string
  logoBase64: string
  subscriptionFee: Decimal
  tags: string[]
  kycDone: boolean
  socials: Omit<VCSocial, 'id' | 'vcId'>
}

export type GetVCProfileById = {
  id: string
}

export type VCProfileResponse = Omit<AddNewVCPayload, 'id' | 'socials'> & {
  vcId: string
  name: string
  description: string
  logoBase64: string
  subscriptionFee: Decimal
  tags: string[]
  kycDone: boolean
  projects: {
    id: string
    name: string
  }[]
}

export type VCProjectsResponse = {
  vcId: string
  projects: {
    id: string
    name: string
    description: string
    round: ProjectRound
  }[]
}

export type AllVCResponse = Pick<
  VC,
  'name' | 'description' | 'logoBase64' | 'subscriptionFee' | 'id'
>[]
