import { AccountType, PrismaClient } from '@prisma/client'

export default class AuthService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  createNewAccountInDb = async (
    username: string,
    email: string,
    password: string,
    accountType: AccountType
  ) => {
    const { id } = await this.prisma.accounts.create({
      data: { username, email, password, accountType },
      select: {
        id: true,
      },
    })

    const relatedData =
      accountType === AccountType.VC
        ? {
            vc: {
              create: {
                name: '',
                description: '',
                logoBase64: '',
                subscriptionFee: -1,
                tags: [],
                kycDone: false,
              },
            },
          }
        : { user: { create: {} } }

    await this.prisma.accounts.update({
      where: { id },
      data: relatedData,
    })

    return id
  }

  getUserByEmailAndPasswordFromDb = async (email: string, password: string) => {
    const user = await this.prisma.accounts.findFirst({
      where: {
        email,
        password,
      },
    })

    return user?.id
  }

  getUserById = async (id: string) => {
    const user = await this.prisma.accounts.findUnique({
      where: {
        id,
      },
      select: { email: true, username: true, accountType: true },
    })

    return user
  }
}
