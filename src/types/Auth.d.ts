import type { UserType } from '@prisma/client'

export type LoginApiPayload = {
  email: string
  password: string
}

export type LoginApiResponse = {
  access_token: string
}

export type SignUpUserPayload = {
  username: string
  email: string
  password: string
  userType: UserType
}

export type SignUpUserApiResponse = {
  access_token: string
}
