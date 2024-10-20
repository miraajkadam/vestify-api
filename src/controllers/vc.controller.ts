import { type Request, type Response } from 'express'

import { isAddNewVCPayloadValid } from '@/helpers/vc.helper'
import VCService from '@/services/vc.service'
import type {
  AddNewVCPayload,
  AllVCResponse,
  GetVCProfileById,
  VCProfileResponse,
  VCProjectsResponse,
} from '@/types/VC.d'
import ApiResponse from '@/utils/ApiResponse'
import { isValidGuid } from '@/utils/common'

export const addNewVC = async (
  req: Request<null, ApiResponse<{ vcId: string }>, AddNewVCPayload, null>,
  res: Response<ApiResponse<{ vcId: string }>>
) => {
  const apiResponse = new ApiResponse<{ vcId: string }>(res)

  try {
    const {
      description,
      kycDone,
      logoBase64,
      name,
      subscriptionFee,
      tags,
      id: accountId,
      socials,
    } = req.body

    if (
      !isAddNewVCPayloadValid(
        accountId,
        name,
        description,
        logoBase64,
        subscriptionFee,
        tags,
        kycDone,
        socials
      )
    )
      return apiResponse.error('invalid payload')

    const vcService = new VCService()

    const isVCExist = await vcService.checkVCExistByIdInDb(accountId)

    if (!isVCExist) return apiResponse.error('Account for VC not found', 404)

    await vcService.createNewVCInDB(
      accountId,
      name,
      description,
      logoBase64,
      subscriptionFee,
      tags,
      kycDone,
      socials
    )

    return apiResponse.success('Successfully added data for the new vc.')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to add data for the new vc', error)
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

    return apiResponse.successWithData(vcDetails, 'VC profile retrieved successfully')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to retrieve VC profile', error)
  }
}

export const getVCProjectsById = async (
  req: Request<
    { vcId: string },
    ApiResponse<VCProjectsResponse>,
    GetVCProfileById,
    VCProjectsResponse
  >,
  res: Response<ApiResponse<VCProjectsResponse>>
) => {
  const apiResponse = new ApiResponse<VCProjectsResponse>(res)

  try {
    const vcId = req.params.vcId

    if (!isValidGuid(vcId)) return apiResponse.error('invalid VC Id')

    const vcService = new VCService()
    const vcProjectsData = await vcService.getVCProjectsByIdFromDB(vcId)

    if (!vcProjectsData) return apiResponse.error('unable to get vc projects')

    if (!vcProjectsData.projects.length)
      return apiResponse.error('No projects found for the given VC ID', 404)

    return apiResponse.successWithData(vcProjectsData, 'Project retrieval successful')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to retrieve vc projects', error)
  }
}

export const getAllVC = async (
  _: Request<null, ApiResponse<AllVCResponse>, GetVCProfileById>,
  res: Response<ApiResponse<AllVCResponse>>
) => {
  const apiResponse = new ApiResponse<AllVCResponse>(res)

  try {
    const vcService = new VCService()
    const vcs = await vcService.getAllVCsFromDb()

    if (!vcs) return apiResponse.error('Unable to get all VCs')

    if (!vcs.length) return apiResponse.error('No VCs found', 404)

    if (vcs !== undefined) return apiResponse.successWithData(vcs, 'VCs list fetch successfully')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to get all VCs', error)
  }
}
