import { PrismaClient, type UserType } from '@prisma/client'

const prisma = new PrismaClient()

export const createNewUserInDb = async (username: string, password: string, userType: UserType) => {
  const user = await prisma.users.create({
    data: { username, password, userType },
    select: {
      id: true,
    },
  })

  return user?.id
}

export const getUserByEmailAndPasswordFromDb = async (username: string, password: string) => {
  const user = await prisma.users.findFirst({
    where: {
      username,
      password,
    },
  })

  return user?.id
}
