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

export const SampleUserProfileResponse = {
  info: {
    email: 'naka@bestify.com',
    discord: 'https://discord.com',
    x: 'https://twitter.com/',
    kycDone: true,
  },
  investmentSummary: {
    deals: 15,
    otcTrades: 5,
    totInvestment: 7678,
    avgInvestment: 231,
  },
  wallet: {
    current: '0xabc1234567890abcdef1234567890abcdef1234',
    last5Used: [
      '0xabc1234567890abcdef1234567890abcdef1234',
      '0xabc1234567890abcdef1234567890abcdef1234',
      '0xabc1234567890abcdef1234567890abcdef1234',
      '0xabc1234567890abcdef1234567890abcdef1234',
      '0xabc1234567890abcdef1234567890abcdef1234',
    ],
  },
  dealsSummary: [
    {
      projName: 'Project Universal',
      allocation: '231',
      tokenRecvd: 2,
      recEvm: '0xabc1234567890abcdef1234567890abcdef1234',
      transaction: {
        contributed: {
          amount: 2312,
          count: 2,
        },
        refunded: {
          amount: 2312,
          count: 2,
        },
        otc: {
          amount: 2312,
          count: 2,
        },
      },
    },
    {
      projName: 'Project Universal',
      allocation: '231',
      tokenRecvd: 2,
      recEvm: '0xabc1234567890abcdef1234567890abcdef1234',
      transaction: {
        contributed: {
          amount: 2312,
          count: 2,
        },
        refunded: {
          amount: 2312,
          count: 2,
        },
        otc: {
          amount: 2312,
          count: 2,
        },
      },
    },
    {
      projName: 'Project Universal',
      allocation: '231',
      tokenRecvd: 2,
      recEvm: '0xabc1234567890abcdef1234567890abcdef1234',
      transaction: {
        contributed: {
          amount: 2312,
          count: 2,
        },
        refunded: {
          amount: 2312,
          count: 2,
        },
        otc: {
          amount: 2312,
          count: 2,
        },
      },
    },
    {
      projName: 'Project Universal',
      allocation: '231',
      tokenRecvd: 2,
      recEvm: '0xabc1234567890abcdef1234567890abcdef1234',
      transaction: {
        contributed: {
          amount: 2312,
          count: 2,
        },
        refunded: {
          amount: 2312,
          count: 2,
        },
        otc: {
          amount: 2312,
          count: 2,
        },
      },
    },
    {
      projName: 'Project Universal',
      allocation: '231',
      tokenRecvd: 2,
      recEvm: '0xabc1234567890abcdef1234567890abcdef1234',
      transaction: {
        contributed: {
          amount: 2312,
          count: 2,
        },
        refunded: {
          amount: 2312,
          count: 2,
        },
        otc: {
          amount: 2312,
          count: 2,
        },
      },
    },
    {
      projName: 'Project Universal',
      allocation: '231',
      tokenRecvd: 2,
      recEvm: '0xabc1234567890abcdef1234567890abcdef1234',
      transaction: {
        contributed: {
          amount: 2312,
          count: 2,
        },
        refunded: {
          amount: 2312,
          count: 2,
        },
        otc: {
          amount: 2312,
          count: 2,
        },
      },
    },
  ],
}
