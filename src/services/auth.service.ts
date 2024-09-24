import { PrismaClient, type AccountType } from '@prisma/client'

export default class AuthService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  createNewUserInDb = async (
    username: string,
    email: string,
    password: string,
    accountType: AccountType
  ) => {
    const user = await this.prisma.accounts.create({
      data: { username, email, password, accountType },
      select: {
        id: true,
      },
    })

    return user?.id
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
