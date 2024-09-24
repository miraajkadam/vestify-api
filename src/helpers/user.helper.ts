import { Decimal } from '@prisma/client/runtime/library'

import { isValidGuid } from '@/utils/common'

/**
 * Formats the response from the database to a simplified structure for venture capitals.
 *
 * @param {Array<Object>} dbOutput - The raw output from the database containing venture capital data.
 *
 * @returns {Array<Object>} An array of formatted venture capital objects.
 */
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

/**
 * Validates the payload for project investment.
 *
 * @param {string} userId - The ID of the user.
 * @param {string} projectId - The ID of the project.
 * @param {Decimal} amount - The investment amount.
 * @param {string} fromWalletKey - The wallet key from which the investment is made.
 * @param {string} paymentCurrency - The currency used for the investment.
 * @param {string} paymentNetwork - The network used for the investment.
 * @param {string} toWalletKey - The wallet key to which the investment is sent.
 *
 * @returns {boolean} True if the payload is valid, otherwise false.
 */
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
    email: 'jane.doe@example.com',
    discord: 'https://discord.gg/janedoe',
    x: 'https://twitter.com/janedoe',
    kycDone: true,
  },
  investmentSummary: {
    deals: 25,
    otcTrades: 10,
    totInvestment: 12500,
    avgInvestment: 500,
  },
  wallet: {
    current: '0x4b0a9876543210abcdef1234567890abcdef1234',
    last5Used: [
      '0x4b0a9876543210abcdef1234567890abcdef1234',
      '0x4b0a9876543210abcdef1234567890abcdef5678',
      '0x4b0a9876543210abcdef1234567890abcdef8765',
      '0x4b0a9876543210abcdef1234567890abcdef4321',
      '0x4b0a9876543210abcdef1234567890abcdef0987',
    ],
  },
  dealsSummary: [
    {
      projName: 'GreenTech Innovations',
      allocation: '500',
      tokenRecvd: 50,
      recEvm: '0x4b0a9876543210abcdef1234567890abcdef1234',
      transaction: {
        contributed: {
          amount: 2500,
          count: 1,
        },
        refunded: {
          amount: 500,
          count: 1,
        },
        otc: {
          amount: 1000,
          count: 1,
        },
      },
    },
    {
      projName: 'HealthWave Solutions',
      allocation: '300',
      tokenRecvd: 30,
      recEvm: '0x4b0a9876543210abcdef1234567890abcdef5678',
      transaction: {
        contributed: {
          amount: 1500,
          count: 1,
        },
        refunded: {
          amount: 300,
          count: 1,
        },
        otc: {
          amount: 700,
          count: 1,
        },
      },
    },
    {
      projName: 'SmartHome Systems',
      allocation: '400',
      tokenRecvd: 40,
      recEvm: '0x4b0a9876543210abcdef1234567890abcdef8765',
      transaction: {
        contributed: {
          amount: 2000,
          count: 1,
        },
        refunded: {
          amount: 400,
          count: 1,
        },
        otc: {
          amount: 900,
          count: 1,
        },
      },
    },
    {
      projName: 'EduTech Platform',
      allocation: '200',
      tokenRecvd: 20,
      recEvm: '0x4b0a9876543210abcdef1234567890abcdef4321',
      transaction: {
        contributed: {
          amount: 1000,
          count: 1,
        },
        refunded: {
          amount: 200,
          count: 1,
        },
        otc: {
          amount: 500,
          count: 1,
        },
      },
    },
    {
      projName: 'EcoFarm Solutions',
      allocation: '350',
      tokenRecvd: 35,
      recEvm: '0x4b0a9876543210abcdef1234567890abcdef0987',
      transaction: {
        contributed: {
          amount: 1750,
          count: 1,
        },
        refunded: {
          amount: 350,
          count: 1,
        },
        otc: {
          amount: 800,
          count: 1,
        },
      },
    },
  ],
}
