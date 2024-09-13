import type { UserType } from '@prisma/client'

export type LoginApiPayload = {
  username: string
  password: string
}

export type LoginApiResponse = string

export type SignUpUserPayload = {
  username: string
  password: string
  userType: UserType
}

export type SignUpUserApiResponse = {}
