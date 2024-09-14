import { type Request, type Response } from 'express'

import {
  AddProjectApiPayload,
  DeleteProjectApiPayload,
  ProjectListResponse,
} from '@/types/ProjectTypes'
import { addProjectToDb, deleteProjectFromDb, getAllProjectFromDb } from '@/dtos/project.dto'
import { ApiResponse } from '@/models/ApiResponse'
import { createErrorResponse } from '@/utils/error'

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
  try {
    const { id } = await addProjectToDb(req.body)

    return res.status(200).send({
      message: 'new project added successfully',
      success: true,
      data: id,
    })
  } catch (ex: unknown) {
    const error = ex as unknown as Error

    const errorMessage = 'An exception occurred while adding project to database, ' + error.message

    console.error(errorMessage)

    const { message, stack, status } = createErrorResponse(errorMessage, error?.stack)

    res.status(status).send({ message, success: false, stack })
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
  try {
    const { id } = req.body
    await deleteProjectFromDb(id)

    return res.status(200).send({
      message: 'project deleted sucessfull',
      success: true,
    })
  } catch (ex: unknown) {
    const error = ex as unknown as Error

    const errorMessage =
      'An exception occurred while deleting project from database, ' + error.message

    console.error(errorMessage)

    const { message, stack, status } = createErrorResponse(errorMessage, error?.stack)

    res.status(status).send({ message, success: false, stack })
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
  try {
    const projects = await getAllProjectFromDb()

    return res.status(200).send({
      message: 'project list fetch successful',
      success: true,
      data: projects,
    })
  } catch (ex: unknown) {
    const error = ex as unknown as Error

    const errorMessage = 'An exception occurred while getting all projects, ' + error.message

    console.error(errorMessage)

    const { message, stack, status } = createErrorResponse(errorMessage, error?.stack)

    res.status(status).send({ message, success: false, stack })
  }
}
