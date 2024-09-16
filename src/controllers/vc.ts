import { type Request, type Response } from 'express'

import { isAddNewVCPayloadValid } from '@/helpers/vc'
import type { AddNewVCPayload } from '@/types/vc.d'
import ApiResponse from '@/utils/ApiResponse'
import VCService from '@/services/vc'

export const addNewVC = async (
  req: Request<null, ApiResponse<null>, AddNewVCPayload, null>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse<null>(res)

  try {
    const { description, kycDone, logoBase64, name, subscriptionFee, tags } = req.body

    if (!isAddNewVCPayloadValid(name, description, logoBase64, subscriptionFee, tags, kycDone))
      return apiResponse.error('invalid payload')

    const vcService = new VCService()
    const vcCreated = await vcService.createNewVCInDB(
      name,
      description,
      logoBase64,
      subscriptionFee,
      tags,
      kycDone
    )

    if (!vcCreated) return apiResponse.error('unable to add a new vc')

    return apiResponse.success('successfully created a new vc')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to create a new vc', error)
  }
}
