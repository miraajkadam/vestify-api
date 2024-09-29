import { AccountType } from '@prisma/client'
import { type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'

import { AuthService } from '@/services'
import type {
  LoginApiPayload,
  LoginApiResponse,
  SignUpUserApiResponse,
  SignUpUserPayload,
} from '@/types/Auth.d'
import ApiResponse from '@/utils/ApiResponse'
// import { JWT_SECRET } from '@/utils/env'

const JWT_SECRET = process.env.JWT_SECRET as string

export const loginUser = async (
  req: Request<null, ApiResponse<LoginApiResponse>, LoginApiPayload, null>,
  res: Response<ApiResponse<LoginApiResponse>>
) => {
  const apiResponse = new ApiResponse<LoginApiResponse>(res)

  try {
    const accessToken = jwt.sign(
      {
        user: req.user,
      },
      JWT_SECRET
    )

    return apiResponse.successWithData({ access_token: accessToken }, 'successfully logged in')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to login', error)
  }
}

export const signupUser = async (
  req: Request<null, ApiResponse<SignUpUserApiResponse>, SignUpUserPayload, null>,
  res: Response<ApiResponse<SignUpUserApiResponse>>
) => {
  const apiResponse = new ApiResponse<SignUpUserApiResponse>(res)

  try {
    const { username, password, email, accountType } = req.body

    if (accountType !== AccountType.VC && accountType !== AccountType.USER)
      return apiResponse.error('invalid account type')

    const authService = new AuthService()
    const newAccountId = await authService.createNewAccountInDb(
      username,
      email,
      password,
      accountType
    )

    if (!newAccountId) return apiResponse.error('unable to create a new account')

    // Generate JWT token
    const accessToken = jwt.sign(
      {
        user: { id: newAccountId },
      },
      JWT_SECRET
    )

    return apiResponse.successWithData(
      { access_token: accessToken },
      'successfully added a new account'
    )
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to create a new account', error)
  }
}

export const logoutUser = async (
  req: Request<null, ApiResponse<null>, null, null>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse<null>(res)

  try {
    req.logout(err => {
      if (err) {
        return apiResponse.error('Logout failed', 500)
      }

      req.session.destroy(err => {
        if (err) {
          return apiResponse.error('session destruction failed', 500)
        }

        return apiResponse.success('logged out successfully')
      })
    })
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to logout user', error)
  }
}
