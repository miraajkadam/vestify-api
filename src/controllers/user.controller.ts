import { type Request, type Response } from 'express'

import {
  formatResponse,
  SampleUserProfileResponse,
  validateProjectInvestmentPayload,
} from '@/helpers/user.helper'
import { UserService } from '@/services'
import {
  GetCapitalsJoinedResponse,
  ProjectInvestmentPayload,
  ProjectInvestmentResponse,
  UserProfileResponse,
} from '@/types/User'
import ApiResponse from '@/utils/ApiResponse'
import { isValidGuid } from '@/utils/common'

export const addUser = async (
  _: Request<null, ApiResponse<{ id: string }>, null, null>,
  res: Response<ApiResponse<{ id: string }>>
) => {
  const apiResponse = new ApiResponse<{ id: string }>(res)

  try {
    const userService = new UserService()
    const { id } = await userService.addUsersToDb()

    if (!id) return apiResponse.error('unable to create a new user')

    return apiResponse.successWithData({ id }, 'successfully created a new user')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to create a new user', error)
  }
}

export const joinVC = async (
  req: Request<null, ApiResponse<null>, { userId: string; vcId: string }, null>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse<null>(res)

  try {
    const { userId, vcId } = req.body

    const userService = new UserService()
    await userService.addUserCapitalInvestmentInDb(userId, vcId)

    return apiResponse.successWithData(null, 'Successfully joined the capital')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to join the capital', error)
  }
}

export const investInProject = async (
  req: Request<null, ApiResponse<ProjectInvestmentResponse>, ProjectInvestmentPayload, null>,
  res: Response<ApiResponse<ProjectInvestmentResponse>>
) => {
  const apiResponse = new ApiResponse<ProjectInvestmentResponse>(res)

  try {
    const {
      userId,
      projectId,
      amount,
      fromWalletKey,
      paymentCurrency,
      paymentNetwork,
      toWalletKey,
    } = req.body

    const isValidPayload = validateProjectInvestmentPayload(
      userId,
      projectId,
      amount,
      fromWalletKey,
      paymentCurrency,
      paymentNetwork,
      toWalletKey
    )

    if (!isValidPayload) return apiResponse.error('Invalid payload')

    const userService = new UserService()

    // Do the actual web3 investment logic here
    // you will get payment id back on success
    // Add the investment to database once success

    const investmentDbResponse = await userService.addUserInvestmentInProjectToDb(
      userId,
      projectId,
      amount,
      fromWalletKey,
      paymentCurrency,
      paymentNetwork,
      toWalletKey,
      '4ca6584-rfd4-hjhggigfd' // transaction Id
    )

    const apiResponseToSend = {
      projectName: investmentDbResponse.project.name,
      amount: investmentDbResponse.amount,
      toWalletKey: investmentDbResponse.toWalletKey,
      fromWalletKey: investmentDbResponse.fromWalletKey,
      paymentNetwork: investmentDbResponse.paymentNetwork,
      paymentCurrency: investmentDbResponse.paymentCurrency,
      transactionTimestamp: investmentDbResponse.investedAt,
      transactionId: investmentDbResponse.transactionId,
    }

    return apiResponse.successWithData(apiResponseToSend, 'Successfully invested into the project')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to invest into the project', error)
  }
}

export const getCapitalsJoined = async (
  req: Request<{ userId: string }, ApiResponse<GetCapitalsJoinedResponse>, null, null>,
  res: Response<ApiResponse<GetCapitalsJoinedResponse>>
) => {
  const apiResponse = new ApiResponse<GetCapitalsJoinedResponse>(res)

  try {
    const { userId } = req.params

    if (!isValidGuid(userId)) return apiResponse.error('Invalid user Id')

    const userService = new UserService()
    const usrJndCap = await userService.getUserJoinedCapitalsFromDb(userId)

    const formattedResponse = formatResponse(usrJndCap)

    return apiResponse.successWithData(
      formattedResponse,
      'Successfully fetched the list of capitals joined by the user'
    )
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to retrieve the list of capitals joined by user', error)
  }
}

export const getUserProfile = async (
  req: Request<{ userId: string }, ApiResponse<UserProfileResponse>, null, null>,
  res: Response<ApiResponse<UserProfileResponse>>
) => {
  const apiResponse = new ApiResponse<UserProfileResponse>(res)

  try {
    const { userId } = req.params

    if (!isValidGuid(userId)) return apiResponse.error('Invalid user Id')

    const response = SampleUserProfileResponse

    return apiResponse.successWithData(response, 'Successfully fetched user profile')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to fetch user profile', error)
  }
}
