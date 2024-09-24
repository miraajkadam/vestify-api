import { Decimal } from '@prisma/client/runtime/library'

import { isValidGuid } from '@/utils/common'

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

export const validateProjectInvestmentPayload = (
  userId: string,
  projectId: string,
  amount: Decimal,
  fromWalletKey: string,
  paymentCurrency: string,
  paymentNetwork: string,
  toWalletKey: string
): boolean => {
  if (!isValidGuid(userId)) return false

  if (!isValidGuid(projectId)) return false

  if (typeof amount !== 'number') return false

  if (typeof paymentCurrency !== 'string') return false

  if (typeof paymentNetwork !== 'string') return false

  if (typeof fromWalletKey !== 'string') return false

  if (typeof toWalletKey !== 'string') return false

  return true
}
