import { AccountType, Interval } from '@prisma/client'

import prisma from '@/db'

export default class AuthService {
  createNewAccountInDb = async (
    username: string,
    email: string,
    password: string,
    accountType: AccountType
  ) => {
    const { id } = await prisma.accounts.create({
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
                subscriptionRenewalInterval: Interval.MONTHLY,
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
        : {
            user: {
              create: {
                userSocial: {
                  create: {
                    id,
                    discord: '',
                    x: '',
                  },
                },
              },
            },
          }

    await prisma.accounts.update({
      where: { id },
      data: relatedData,
    })

    return id
  }

  getEncPassIdByEmlFrmDb = async (email: string) => {
    const user = await prisma.accounts.findFirst({
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
    const user = await prisma.accounts.findUnique({
      where: {
        id,
      },
      select: { email: true, username: true, accountType: true },
    })

    return user
  }
}
