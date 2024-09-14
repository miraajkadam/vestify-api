import { UserType } from '@prisma/client'
import { type Request, type Response } from 'express'

import { createNewUserInDb, getUserByEmailAndPasswordFromDb } from '@/dtos/auth.dto'
import type {
  LoginApiPayload,
  LoginApiResponse,
  SignUpUserApiResponse,
  SignUpUserPayload,
} from '@/types/AuthTypes'
import ApiResponse from '@/utils/ApiResponse'

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */
export const loginUser = async (
  req: Request<null, ApiResponse<LoginApiResponse>, LoginApiPayload, null>,
  res: Response<ApiResponse<LoginApiResponse>>
) => {
  const apiResponse = new ApiResponse<LoginApiResponse>(res)

  try {
    const { username, password } = req.body

    const user = await getUserByEmailAndPasswordFromDb(username, password)

    if (!user) return apiResponse.error('invalid email or password')

    return apiResponse.successWithData(user, 'successfully logged in')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to login', error)
  }
}

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - userType
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               userType:
 *                 type: string
 *                 enum: [VC, USER]

 */
export const signupUser = async (
  req: Request<null, ApiResponse<SignUpUserApiResponse>, SignUpUserPayload, null>,
  res: Response<ApiResponse<SignUpUserApiResponse>>
) => {
  const apiResponse = new ApiResponse<SignUpUserApiResponse>(res)

  try {
    const { username, password, userType } = req.body

    if (userType !== UserType.VC)
      if (userType !== UserType.USER) return apiResponse.error('invalid user type')

    const newUser = await createNewUserInDb(username, password, userType)

    if (!newUser) return apiResponse.error('unable to create a new user')

    return apiResponse.successWithData(newUser, 'successfully created a new user')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to create a new user', error)
  }
}
