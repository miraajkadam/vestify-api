import { PrismaClient, type UserType } from '@prisma/client'

export default class AuthService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  createNewUserInDb = async (username: string, password: string, userType: UserType) => {
    const user = await this.prisma.users.create({
      data: { username, password, userType },
      select: {
        id: true,
      },
    })

    return user?.id
  }

  getUserByEmailAndPasswordFromDb = async (username: string, password: string) => {
    const user = await this.prisma.users.findFirst({
      where: {
        username,
        password,
      },
    })

    return user?.id
  }
}
