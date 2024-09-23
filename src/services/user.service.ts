import { PrismaClient } from '@prisma/client'

/**
 * Service class for managing users in the database.
 *
 * @class
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

  addUsersToDb = async (): Promise<{ id: string }> =>
    await this.prisma.users.create({ data: {}, select: { id: true } })

  addUserCapitalInvestmentInDb = async (userId: string, vcId: string) =>
    await this.prisma.usersJoinedCapitals.create({
      data: {
        userId,
        vcId,
      },
    })

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
}
