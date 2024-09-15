import { type Request, type Response } from 'express'

import { ProjectService } from '@/services'
import {
  AddProjectApiPayload,
  DeleteProjectApiPayload,
  ProjectListResponse,
} from '@/types/ProjectTypes'
import ApiResponse from '@/utils/ApiResponse'

export const addNewProject = async (
  req: Request<null, ApiResponse<string>, AddProjectApiPayload, null>,
  res: Response<ApiResponse<string>>
) => {
  const apiResponse = new ApiResponse<string>(res)

  try {
    const ps = new ProjectService()

    const { id } = await ps.addProjectToDb(req.body)

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

    const ps = new ProjectService()

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