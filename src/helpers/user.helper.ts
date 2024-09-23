import type { Decimal } from '@prisma/client/runtime/library'

export const formatResponse = (
  dbOutput: {
    vc: {
      id: string
      name: string
      description: string
      logoBase64: string
      subscriptionFee: Decimal
    }
  }[]
) =>
  dbOutput.map(item => ({
    id: item.vc.id,
    name: item.vc.name,
    description: item.vc.description,
    logoBase64: item.vc.logoBase64,
    subscriptionFee: item.vc.subscriptionFee,
  }))
