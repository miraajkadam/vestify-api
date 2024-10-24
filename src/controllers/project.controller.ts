import { type Request, type Response } from 'express'

import {
  isAddNewProjectPayloadValid,
  strProjForResponse,
  strRespFrInvestmentStats,
} from '@/helpers/project.helper'
import { ProjectService } from '@/services'
import {
  AddProjectApiPayload,
  DeleteProjectApiPayload,
  ProjectDetailsResponse,
  ProjectListResponse,
  ProjectProfileResponse,
} from '@/types/Project'
import ApiResponse from '@/utils/ApiResponse'
import { isValidGuid } from '@/utils/common'

export const addNewProject = async (
  req: Request<null, ApiResponse<string>, AddProjectApiPayload, null>,
  res: Response<ApiResponse<string>>
) => {
  const apiResponse = new ApiResponse<string>(res)

  try {
    if (!isAddNewProjectPayloadValid(req.body)) return apiResponse.error('Invalid request payload')

    const ps = new ProjectService()

    const { id } = await ps.addProjectToDb(req.body)

    console.log(`New project {${id}} added successfully under VC {${req.body.info.vcId}} `)
    return apiResponse.successWithData(id, 'new project was added successfully')
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

    if (!isValidGuid(id)) return apiResponse.error('Invalid project ID')

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

    if (!isValidGuid(id)) return apiResponse.error('Invalid project ID')

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

    if (!isValidGuid(id)) return apiResponse.error('Invalid project ID')

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
