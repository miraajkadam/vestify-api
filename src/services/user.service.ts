import { PrismaClient } from '@prisma/client'

import { Decimal } from '@prisma/client/runtime/library'

/**
 * Service class for managing users in the database.
 * Provides methods to add users, record investments, and retrieve user-related data.
 *
 * @class UserService
 */
export default class UserService {
  private prisma: PrismaClient

  /**
   * Constructs a new UserService instance.
   * Initializes a PrismaClient instance for database interactions.
   *
   * @constructor
   */
  constructor() {
    this.prisma = new PrismaClient()
  }

  /**
   * Records a user's capital investment in a venture capital fund.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} vcId - The ID of the venture capital fund.
   *
   * @returns {Promise<{  vcId: string; userId: string; joinedAt: Date; }>} A promise that resolves when the investment is recorded.
   */
  addUserCapitalInvestmentInDb = async (userId: string, vcId: string) =>
    await this.prisma.usersJoinedCapitals.create({
      data: {
        userId,
        vcId,
      },
    })

  /**
   * Retrieves the list of venture capitals that a user has joined.
   *
   * @param {string} userId - The ID of the user.
   *
   * @returns {Promise<Array<Object>>} A promise that resolves to an array of venture capitals joined by the user.
   *
   * @throws Will throw an error if the user is not found.
   */
  getUserJoinedCapitalsFromDb = async (userId: string) => {
    const usersCapitalsList = await this.prisma.users.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        joinedCapitals: {
          select: {
            joinedAt: false,
            user: false,
            userId: false,
            vcId: false,
            vc: {
              select: {
                name: true,
                logoBase64: true,
                description: true,
                subscriptionFee: true,
                id: true,
              },
            },
          },
          orderBy: {
            joinedAt: 'desc',
          },
        },
      },
    })

    return usersCapitalsList?.joinedCapitals
  }

  /**
   * Records a user's investment in a project.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} projectId - The ID of the project.
   * @param {Decimal} amount - The investment amount.
   * @param {string} fromWalletKey - The key of the wallet from which the investment is made.
   * @param {string} paymentCurrency - The currency used for the payment.
   * @param {string} paymentNetwork - The network used for the payment.
   * @param {string} toWalletKey - The key of the wallet to which the investment is sent.
   * @param {string} transactionId - The ID of the transaction.
   *
   * @returns {Promise<Object>} A promise that resolves to the investment details recorded.
   */
  addUserInvestmentInProjectToDb = async (
    userId: string,
    projectId: string,
    amount: Decimal,
    fromWalletKey: string,
    paymentCurrency: string,
    paymentNetwork: string,
    toWalletKey: string,
    transactionId: string
  ) =>
    await this.prisma.usersInvestedProjects.create({
      data: {
        userId,
        projectId,
        amount,
        fromWalletKey,
        paymentCurrency,
        paymentNetwork,
        toWalletKey,
        transactionId,
      },
      select: {
        amount: true,
        fromWalletKey: true,
        investedAt: true,
        paymentCurrency: true,
        paymentNetwork: true,
        toWalletKey: true,
        transactionId: true,
        project: {
          select: {
            name: true,
          },
        },
      },
    })
}
