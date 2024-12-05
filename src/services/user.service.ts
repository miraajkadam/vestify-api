import { Decimal } from '@prisma/client/runtime/library'

import prisma from '@/db'

/**
 * Service class for managing users in the database.
 * Provides methods to add users, record investments, and retrieve user-related data.
 *
 * @class UserService
 */
export default class UserService {
  /**
   * Records a user's capital investment in a venture capital fund.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} vcId - The ID of the venture capital fund.
   *
   * @returns {Promise<{  vcId: string; userId: string; joinedAt: Date; }>} A promise that resolves when the investment is recorded.
   */
  addUserCapitalInvestmentInDb = async (userId: string, vcId: string) => {
    const dateNow = new Date()

    return await prisma.usersJoinedCapitals.create({
      data: {
        userId,
        vcId,
        joinedAt: dateNow,
        renewedAt: dateNow,
      },
      select: {
        userId: true,
        vcId: true,
      },
    })
  }

  /**
   * Updates the 'renewedAt' field for a user's capital investment in a specific venture capital (VC) in the database.
   *
   * This function updates the 'renewedAt' timestamp for the specified user and VC in the 'usersJoinedCapitals' table
   * of the database. The function expects the combination of `userId` and `vcId` to uniquely identify the record
   * to be updated. The timestamp is set to the current date and time.
   *
   * @async
   * @function updateUserCapitalInvestmentInDb
   * @param {string} userId - The unique identifier of the user.
   * @param {string} vcId - The unique identifier of the venture capital.
   * @returns {Promise<{  vcId: string; userId: string; joinedAt: Date; }>} The updated user and VC combination with the fields `userId` and `vcId`.
   *
   * @throws {Error} If the update operation fails or if invalid parameters are provided.
   */
  updateUserCapitalInvestmentInDb = async (userId: string, vcId: string) =>
    await prisma.usersJoinedCapitals.update({
      where: {
        userId_vcId: {
          userId,
          vcId,
        },
      },
      data: {
        renewedAt: new Date(),
      },
      select: {
        userId: true,
        vcId: true,
      },
    })

  /**
   * Checks if a user has already joined a specific venture capital (VC).
   *
   * @async
   * @function checkIfUserJoinedVCAlready
   * @param {string} userId - The ID of the user to check.
   * @param {string} vcId - The ID of the venture capital to check against.
   * @returns {Promise<{joinedAt: Date} | null>} - Returns true if the user has joined the VC, otherwise false.
   */
  checkIfUserJoinedVCAlready = async (userId: string, vcId: string) => {
    const entity = await prisma.usersJoinedCapitals.findFirst({
      where: {
        userId,
        vcId,
      },
      select: {
        renewedAt: true,
      },
    })

    return entity
  }

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
    const usersCapitalsList = await prisma.users.findUniqueOrThrow({
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
    await prisma.usersInvestedProjects.create({
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
