import { PrismaClient, type UserType } from '@prisma/client'

export default class AuthService {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  createNewUserInDb = async (
    username: string,
    email: string,
    password: string,
    userType: UserType
  ) => {
    const user = await this.prisma.users.create({
      data: { username, email, password, userType },
      select: {
        id: true,
      },
    })

    return user?.id
  }

  getUserByEmailAndPasswordFromDb = async (email: string, password: string) => {
    const user = await this.prisma.users.findFirst({
      where: {
        email,
        password,
      },
    })

    return user?.id
  }
}
