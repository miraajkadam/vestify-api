import { type Request, type Response } from 'express'

import { isAddNewVCPayloadValid } from '@/helpers/vc'
import VCService from '@/services/vc'
import type {
  AddNewVCPayload,
  GetVCProfileById,
  VCProfileResponse,
  VCProjectsResponse,
} from '@/types/vc.d'
import ApiResponse from '@/utils/ApiResponse'
import { isValidGuid } from '@/utils/common'

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

export const getVCProfileById = async (
  req: Request<
    { vcId: string },
    ApiResponse<VCProfileResponse>,
    GetVCProfileById,
    VCProfileResponse
  >,
  res: Response<ApiResponse<VCProfileResponse>>
) => {
  const apiResponse = new ApiResponse<VCProfileResponse>(res)

  try {
    const vcId = req.params.vcId

    if (!isValidGuid(vcId)) return apiResponse.error('invalid VC Id')

    const vcService = new VCService()

    const isVCExist = await vcService.checkVCExistByIdInDb(vcId)

    if (!isVCExist) return apiResponse.error('VC profile not found', 404)

    const vcDetails = await vcService.getVCDetailsFromDB(vcId)

    if (!vcDetails) return apiResponse.error('unable to get vc details')

    return apiResponse.successWithData(vcDetails, 'successfully created a new vc')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to create a new vc', error)
  }
}

export const getVCProjectsById = async (
  req: Request<
    { vcId: string },
    ApiResponse<VCProfileResponse>,
    GetVCProfileById,
    VCProfileResponse
  >,
  res: Response<ApiResponse<VCProfileResponse>>
) => {
  const apiResponse = new ApiResponse<VCProjectsResponse>(res)

  try {
    const vcId = req.params.vcId

    if (!isValidGuid(vcId)) return apiResponse.error('invalid VC Id')

    const vcService = new VCService()
    const vcProjects = await vcService.getVCProjectsByIdFromDB(vcId)

    if (!vcProjects) return apiResponse.error('unable to get vc projects')

    if (!vcProjects.length) return apiResponse.error('No projects found for the given VC ID', 404)

    return apiResponse.successWithData(vcProjects, 'project for vc get successful')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to create a new vc', error)
  }
}
