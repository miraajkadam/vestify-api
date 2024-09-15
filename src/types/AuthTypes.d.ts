import type { UserType } from '@prisma/client'

export type LoginApiPayload = {
  email: string
  password: string
}

export type LoginApiResponse = string

export type SignUpUserPayload = {
  username: string
  email: string
  password: string
  userType: UserType
}

export type SignUpUserApiResponse = string
