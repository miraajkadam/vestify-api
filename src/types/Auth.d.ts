import type { AccountType } from '@prisma/client'

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
  accountType: AccountType
}

export type SignUpUserApiResponse = {
  access_token: string
}
