import type { ProjectRound } from '@prisma/client'
import type { Decimal } from '@prisma/client/runtime/library'

export type AddNewVCPayload = {
  name: string
  description: string
  logoBase64: string
  subscriptionFee: Decimal
  tags: string[]
  kycDone: boolean
}

export type GetVCProfileById = {
  id: string
}

export type VCProfileResponse = AddNewVCPayload & {
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
  id: string
  name: string
  description: string
  round: ProjectRound
}[]

export type AllVCResponse = Pick<
  VC,
  'name' | 'description' | 'logoBase64' | 'subscriptionFee' | 'id'
>[]
