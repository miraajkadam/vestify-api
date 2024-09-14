import { type Request, type Response } from 'express'

import { addProjectToDb, deleteProjectFromDb, getAllProjectFromDb } from '@/dtos/project.dto'
import {
  AddProjectApiPayload,
  DeleteProjectApiPayload,
  ProjectListResponse,
} from '@/types/ProjectTypes'
import ApiResponse from '@/utils/ApiResponse'

/**
 * @swagger
 * components:
 *   schemas:
 *     AddProjectRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /api/project/new:
 *   post:
 *     summary: Add a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddProjectRequest'
 *     responses:
 *       200:
 *         description: Project added successfully
 *       500:
 *         description: Server error
 */

export const addNewProject = async (
  req: Request<null, ApiResponse<string>, AddProjectApiPayload, null>,
  res: Response<ApiResponse<string>>
) => {
  const apiResponse = new ApiResponse<string>(res)

  try {
    const { id } = await addProjectToDb(req.body)

    return apiResponse.successWithData(id, 'new project was added successfully')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to add a new project', error)
  }
}

/**
 * @swagger
 * /api/project:
 *   delete:
 *     summary: Delete a project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteProjectRequest'
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       500:
 *         description: Server error
 */

export const deleteProject = async (
  req: Request<null, ApiResponse<null>, DeleteProjectApiPayload, null>,
  res: Response<ApiResponse<null>>
) => {
  const apiResponse = new ApiResponse(res)

  try {
    const { id } = req.body
    await deleteProjectFromDb(id)

    return apiResponse.success('project deleted successfully')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to delete project', error)
  }
}

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: List of projects fetched successfully
 *       500:
 *         description: Server error
 */

export const getAllProjects = async (
  req: Request<null, ApiResponse<ProjectListResponse>, DeleteProjectApiPayload, null>,
  res: Response<ApiResponse<ProjectListResponse>>
) => {
  const apiResponse = new ApiResponse<ProjectListResponse>(res)

  try {
    const projects = await getAllProjectFromDb()

    return apiResponse.successWithData(projects, 'project list fetch successful')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to fetch project list', error)
  }
}
