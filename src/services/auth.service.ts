import { AccountType, PrismaClient } from '@prisma/client'

export default class AuthService {
  private readonly prisma: PrismaClient

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
                VCSocial: {
                  create: {
                    id,
                    discord: '',
                    medium: '',
                    telegram: '',
                    x: '',
                    youtube: '',
                    website: '',
                  },
                },
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

  getEncPassIdByEmlFrmDb = async (email: string) => {
    const user = await this.prisma.accounts.findFirst({
      where: {
        email,
      },
      select: {
        password: true,
        id: true,
      },
    })

    return user
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
