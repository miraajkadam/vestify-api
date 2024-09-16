import { Router } from 'express'

import { addNewProject, deleteProject, getAllProjects } from '@/controllers/project'
import passport from '@/utils/passport'

const projectRouter = Router()

/**
 * @swagger
 * /api/project/new:
 *   post:
 *     summary: Add a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddProjectApiPayload'
 *     responses:
 *       200:
 *         description: Project added successfully
 *       500:
 *         description: Server error
 */
projectRouter.post('/new', addNewProject)

/**
 * @swagger
 * /api/project/delete:
 *   post:
 *     summary: Delete a project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteProjectApiPayload'
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       500:
 *         description: Server error
 */
projectRouter.post('/delete', deleteProject)

/**
 * @swagger
 * /api/project/getAll:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectListResponse'
 *       500:
 *         description: Server error
 */
projectRouter.get('/getAll', getAllProjects)

export default projectRouter
