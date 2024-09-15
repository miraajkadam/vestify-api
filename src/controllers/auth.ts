import { UserType } from '@prisma/client'
import { type Request, type Response } from 'express'

import { AuthService } from '@/services'
import type {
  LoginApiPayload,
  LoginApiResponse,
  SignUpUserApiResponse,
  SignUpUserPayload,
} from '@/types/AuthTypes'
import ApiResponse from '@/utils/ApiResponse'

export const loginUser = async (
  req: Request<null, ApiResponse<LoginApiResponse>, LoginApiPayload, null>,
  res: Response<ApiResponse<LoginApiResponse>>
) => {
  const apiResponse = new ApiResponse<LoginApiResponse>(res)

  try {
    const { email, password } = req.body

    const authService = new AuthService()
    const user = await authService.getUserByEmailAndPasswordFromDb(email, password)

    if (!user) return apiResponse.error('invalid email or password')

    return apiResponse.successWithData(user, 'successfully logged in')
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
    const { username, password, email, userType } = req.body

    if (userType !== UserType.VC)
      if (userType !== UserType.USER) return apiResponse.error('invalid user type')

    const authService = new AuthService()
    const newUser = await authService.createNewUserInDb(username, email, password, userType)

    if (!newUser) return apiResponse.error('unable to create a new user')

    return apiResponse.successWithData(newUser, 'successfully created a new user')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to create a new user', error)
  }
}
