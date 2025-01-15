import { type Request, type Response } from 'express'

import {
  getProjectDistributionPools,
  isAddNewProjectPayloadValid,
  isVestingScheduleValid,
  mapAddressesToUsers,
  strProjForResponse,
  strRespFrInvestmentStats,
  validateAddDistributionPoolPayload,
  validateDistPoolsDetailsParams,
  validateProjectId,
} from '@/helpers/project.helper'
import { ProjectService } from '@/services'
import {
  AddDistributionPoolPayload,
  AddDistributionPoolResponse,
  AddProjectApiPayload,
  AddressGroups,
  AddVestingSchedule,
  DeleteProjectApiPayload,
  GetDistributionPoolResponse,
  GetVestingSchedule,
  ProjectDetailsResponse,
  ProjectListResponse,
  ProjectProfileResponse,
} from '@/types/Project'
import ApiResponse from '@/utils/ApiResponse'

export const addNewProject = async (
  req: Request<null, ApiResponse<string>, AddProjectApiPayload, null>,
  res: Response<ApiResponse<string>>
) => {
  const apiResponse = new ApiResponse<string>(res)

  try {
    if (!isAddNewProjectPayloadValid(req.body)) return apiResponse.error('Invalid request payload')

    const ps = new ProjectService()

    await ps.addProjectToDb(req.body)

    console.log(
      `New project {${req.body.onChain.projectId}} added successfully under VC {${req.body.info.vcId}} `
    )
    return apiResponse.success('new project was added successfully')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to add a new project', error)
  }
}

export const deleteProject = async (
  req: Request<null, ApiResponse<null>, DeleteProjectApiPayload, null>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse(res)

  try {
    const { id } = req.body

    if (!id || typeof id !== 'string') return apiResponse.error('Invalid project ID')

    const ps = new ProjectService()

    const isProjectExist = await ps.checkProjectExistenceInDb(id)

    if (!isProjectExist) return apiResponse.error('Project not found', 404)

    await ps.deleteProjectFromDb(id)

    return apiResponse.success('project deleted successfully')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to delete project', error)
  }
}

export const getAllProjects = async (
  req: Request<null, ApiResponse<ProjectListResponse>, DeleteProjectApiPayload, null>,
  res: Response<ApiResponse<ProjectListResponse>>
) => {
  const apiResponse = new ApiResponse<ProjectListResponse>(res)

  try {
    const ps = new ProjectService()
    const projects = await ps.getAllProjectFromDb()

    return apiResponse.successWithData(projects, 'project list fetch successful')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to fetch project list', error)
  }
}

export const getProjectByProjectId = async (
  req: Request<{ projectId: string }, ApiResponse<ProjectProfileResponse>, null, null>,
  res: Response<ApiResponse<ProjectProfileResponse>>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiResponse = new ApiResponse<any>(res)

  try {
    const { projectId: id } = req.params

    if (!id || typeof id !== 'string') return apiResponse.error('Invalid project ID')

    const ps = new ProjectService()

    const isProjectExist = await ps.checkProjectExistenceInDb(id)

    if (!isProjectExist) return apiResponse.error('Project not found', 404)

    const project = await ps.getProjectByIdFromDb(id)

    if (!project) return apiResponse.error('Unable to fetch project')

    const resProjResp = strProjForResponse(project)

    return apiResponse.successWithData(resProjResp, 'Requested project fetched successfully')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to fetch the project', error)
  }
}

export const getInvestmentStatsForProject = async (
  req: Request<{ projectId: string }, ApiResponse<ProjectDetailsResponse>, null, null>,
  res: Response<ApiResponse<ProjectDetailsResponse>>
) => {
  const apiResponse = new ApiResponse<ProjectDetailsResponse>(res)

  try {
    const { projectId: id } = req.params

    if (!id || typeof id !== 'string') return apiResponse.error('Invalid project ID')

    const ps = new ProjectService()

    const isProjectExist = await ps.checkProjectExistenceInDb(id)

    if (!isProjectExist) return apiResponse.error('Project not found', 404)

    const projectStats = await ps.getProjectStats(id)

    const strResp = strRespFrInvestmentStats(projectStats)

    return apiResponse.successWithData(strResp, 'Requested project fetched successfully')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to fetch the project', error)
  }
}

// #region Distribution pools
export const addPool = async (
  req: Request<null, ApiResponse<AddDistributionPoolResponse>, AddDistributionPoolPayload>,
  res: Response<ApiResponse<AddDistributionPoolResponse>>
) => {
  const apiResponse = new ApiResponse<AddDistributionPoolResponse>(res)

  try {
    const { name, addresses, fee, maxAllocation, minAllocation, projectId } = req.body

    const isValidPayload = validateAddDistributionPoolPayload(
      name,
      addresses,
      fee,
      maxAllocation,
      minAllocation,
      projectId
    )

    if (!isValidPayload) return apiResponse.error('Invalid payload')

    const pService = new ProjectService()

    const isProjExist = await pService.checkProjectExistenceInDb(projectId)
    if (!isProjExist) return apiResponse.error('Project not found', 404)

    const id = await pService.addDistributionPoolInDb(
      projectId,
      name,
      addresses,
      fee,
      maxAllocation,
      minAllocation
    )

    if (!id) return apiResponse.error('Unable to add distribution pool in db')

    return apiResponse.successWithData(id, 'Distribution pool added')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to add distribution pool', error)
  }
}

export const getProjectDistPools = async (
  req: Request<{ projectId: string }, ApiResponse<AddressGroups>, null>,
  res: Response<ApiResponse<AddressGroups>>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const apiResponse = new ApiResponse<AddressGroups>(res)

  try {
    const { projectId } = req.params

    const invalidPId = !projectId || typeof projectId !== 'string'

    if (invalidPId) return apiResponse.error('Invalid project Id')

    const pService = new ProjectService()

    const isProjExist = await pService.checkProjectExistenceInDb(projectId)
    if (!isProjExist) return apiResponse.error('Project not found', 404)

    const projDistPools = (await getProjectDistributionPools(projectId)) as AddressGroups

    return apiResponse.successWithData(projDistPools, 'Distribution pool added')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to add distribution pool', error)
  }
}

export const deleteAllProjectDistributionPools = async (
  req: Request<{ projectId: string }, ApiResponse<null>>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse<null>(res)

  try {
    const { projectId } = req.params

    const invalidPId = !projectId || typeof projectId !== 'string'

    if (invalidPId) return apiResponse.error('Invalid project Id')

    const pService = new ProjectService()

    await pService.deleteAllDistributionPoolFromDb(projectId)

    return apiResponse.success('Successfully deleted all distribution pools')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to delete all distribution pool', error)
  }
}

export const getProjectDistPoolDetails = async (
  req: Request<{ distPoolId: string }, ApiResponse<GetDistributionPoolResponse>>,
  res: Response<ApiResponse<GetDistributionPoolResponse>>
) => {
  const apiResponse = new ApiResponse<GetDistributionPoolResponse>(res)

  try {
    const { distPoolId } = req.params

    const isParamsValid = validateDistPoolsDetailsParams(distPoolId)

    if (!isParamsValid) return apiResponse.error('Invalid distribution pool id')

    const pService = new ProjectService()

    const distPool = await pService.getDistributionPoolFromDb(distPoolId)

    if (!distPool) return apiResponse.error('Distribution pool not found')

    // const mappedAddresses = mapAddressesToUsers(distPool.addresses)

    return apiResponse.successWithData(distPool, 'Successfully fetched distribution pool')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to fetch distribution pool', error)
  }
}

export const deleteProjectDistributionPool = async (
  req: Request<{ distPoolId: string }, ApiResponse<null>>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse<null>(res)

  try {
    const { distPoolId } = req.params

    const isParamsValid = validateDistPoolsDetailsParams(distPoolId)

    if (!isParamsValid) return apiResponse.error('Invalid distribution pool id')

    const pService = new ProjectService()

    await pService.deleteDistributionPoolFromDb(distPoolId)

    return apiResponse.success('Successfully deleted distribution pool')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to delete distribution pool', error)
  }
}

// #endregion

// #region Vesting schedules
export const addVestingScheduleCon = async (
  req: Request<{ projectId: string }, ApiResponse<null>, AddVestingSchedule, null>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse<null>(res)

  try {
    const { projectId } = req.params

    const validPId = validateProjectId(projectId)

    if (!validPId) return apiResponse.error('Invalid project Id')

    const isValidPayload = isVestingScheduleValid(req.body)
    if (!isValidPayload) return apiResponse.error('Invalid payload')

    const pService = new ProjectService()

    const isProjExist = await pService.checkProjectExistenceInDb(projectId)
    if (!isProjExist) return apiResponse.error('Project not found', 404)

    const isExistingSchedule = await pService.checkExistingVestingScheduleInDb(projectId)
    if (isExistingSchedule) return apiResponse.error('Schedule already created for the project')

    await pService.addVestingScheduleInDB(projectId, req.body)

    return apiResponse.success('Added vesting schedule')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to add vesting schedule', error)
  }
}

export const deleteVestingSchedule = async (
  req: Request<{ projectId: string }, ApiResponse<null>>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse<null>(res)

  try {
    const { projectId } = req.params

    const validPId = validateProjectId(projectId)

    if (!validPId) return apiResponse.error('Invalid project Id')

    const pService = new ProjectService()

    const isProjExist = await pService.checkProjectExistenceInDb(projectId)
    if (!isProjExist) return apiResponse.error('Project not found', 404)

    const isExistingSchedule = await pService.checkExistingVestingScheduleInDb(projectId)
    if (!isExistingSchedule) return apiResponse.error(`Schedule doesn't exist`)

    await pService.deleteVestingScheduleFromDb(projectId)

    return apiResponse.success('Successfully deleted vesting schedule')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to delete vesting schedule', error)
  }
}

export const editVestingSchedule = async (
  req: Request<{ projectId: string }, ApiResponse<null>, AddVestingSchedule, null>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse<null>(res)

  try {
    const { projectId } = req.params

    const validPId = validateProjectId(projectId)

    if (!validPId) return apiResponse.error('Invalid project Id')

    const isValidPayload = isVestingScheduleValid(req.body)
    if (!isValidPayload) return apiResponse.error('Invalid payload')

    const pService = new ProjectService()

    const isProjExist = await pService.checkProjectExistenceInDb(projectId)
    if (!isProjExist) return apiResponse.error('Project not found', 404)

    const isExistingSchedule = await pService.checkExistingVestingScheduleInDb(projectId)
    if (!isExistingSchedule) return apiResponse.error(`Schedule doesn't exist`)

    await pService.editVestingScheduleInDb(projectId, req.body)

    return apiResponse.success('Edited vesting schedule')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to edit vesting schedule', error)
  }
}

export const getVestingSchedule = async (
  req: Request<{ projectId: string }, ApiResponse<GetVestingSchedule>>,
  res: Response<ApiResponse<GetVestingSchedule>>
) => {
  const apiResponse = new ApiResponse<GetVestingSchedule>(res)

  try {
    const { projectId } = req.params

    const validPId = validateProjectId(projectId)

    if (!validPId) return apiResponse.error('Invalid project Id')

    const pService = new ProjectService()

    const isProjExist = await pService.checkProjectExistenceInDb(projectId)
    if (!isProjExist) return apiResponse.error('Project not found', 404)

    const isExistingSchedule = await pService.getVestingScheduleFromDB(projectId)
    if (!isExistingSchedule) return apiResponse.error(`Schedule doesn't exist`)

    const vestingSch = await pService.getVestingScheduleFromDB(projectId)

    return apiResponse.successWithData(vestingSch, 'Fetched vesting schedule')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to fetch vesting schedule', error)
  }
}
// #endregion
