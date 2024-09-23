import { type Request, type Response } from 'express'

import { formatResponse } from '@/helpers/user.helper'
import { UserService } from '@/services'
import { GetCapitalsJoinedResponse } from '@/types/User'
import ApiResponse from '@/utils/ApiResponse'
import { isValidGuid } from '@/utils/common'

export const addUser = async (
  req: Request<null, ApiResponse<{ id: string }>, null, null>,
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

    return apiResponse.successWithData(null, 'successfully created a new user')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to create a new user', error)
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

    return apiResponse.successWithData(formattedResponse, 'successfully created a new user')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to retrieve the list of capitals joined by user', error)
  }
}
