import { Router } from 'express'

import { addNewProject, deleteProject, getAllProjects } from '@/controllers/project'

const projectRouter = Router()

/**
 * @swagger
 * /api/project/new:
 *   post:
 *     summary: Add a new project
 *     description: Create a new project with all relevant details and return the project ID upon success.
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               info:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: The name of the project.
 *                     example: "Bitcoin"
 *                   category:
 *                     type: string
 *                     description: The category of the project.
 *                     example: "Crypto"
 *                   description:
 *                     type: string
 *                     description: A brief description of the project.
 *                     example: "Bitcoin is a leading cryptocurrency with significant market potential."
 *                   round:
 *                     type: string
 *                     description: The funding round for the project.
 *                     example: "PRE_SEED"
 *                   vcId:
 *                     type: string
 *                     description: The ID of the venture capital firm associated with the project.
 *                     example: "7242012c-511a-410a-b99b-7f2ecf0d238b"
 *               tokenMetrics:
 *                 type: object
 *                 properties:
 *                   allocation:
 *                     type: string
 *                     description: Token allocation details.
 *                     example: "5000000"
 *                   fdv:
 *                     type: string
 *                     description: Fully Diluted Valuation.
 *                     example: "1000000000"
 *                   price:
 *                     type: string
 *                     description: Price of the token.
 *                     example: "1.23"
 *                   tgeUnlock:
 *                     type: string
 *                     description: Token Generation Event unlock status.
 *                     example: "Yes"
 *                   tge:
 *                     type: string
 *                     description: Date and time of the Token Generation Event.
 *                     example: "2024-08-28T12:20:13.264Z"
 *                   vesting:
 *                     type: string
 *                     description: Date and time when the token vesting starts.
 *                     example: "2024-08-28T12:20:13.264Z"
 *               deals:
 *                 type: object
 *                 properties:
 *                   maximum:
 *                     type: number
 *                     description: Maximum deal amount.
 *                     example: 2000.50
 *                   minimum:
 *                     type: number
 *                     description: Minimum deal amount.
 *                     example: 1000.00
 *                   acceptedTokens:
 *                     type: string
 *                     description: Tokens accepted for the deal.
 *                     example: "BTC"
 *                   poolFee:
 *                     type: number
 *                     description: Fee percentage for the pool.
 *                     example: 2.5
 *               teamAndAdvisors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       description: Description of the team member or advisor.
 *                       example: "Experienced advisor with a background in blockchain technology."
 *                     name:
 *                       type: string
 *                       description: Name of the team member or advisor.
 *                       example: "Alice Johnson"
 *                     title:
 *                       type: string
 *                       description: Title or role of the team member or advisor.
 *                       example: "Blockchain Specialist"
 *               partnersAndInvestors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     logo:
 *                       type: string
 *                       description: Logo or brand name of the partner or investor.
 *                       example: "Partner Logo"
 *                     name:
 *                       type: string
 *                       description: Name of the partner or investor.
 *                       example: "Venture Capital Inc."
 *               projectSocials:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: string
 *                     description: Placeholder or extra social information.
 *                     example: "Additional info"
 *                   instagram:
 *                     type: string
 *                     description: Instagram handle or URL.
 *                     example: "https://instagram.com/project_handle"
 *                   discord:
 *                     type: string
 *                     description: Discord handle or URL.
 *                     example: "https://discord.gg/project_invite"
 *                   telegram:
 *                     type: string
 *                     description: Telegram handle or URL.
 *                     example: "https://t.me/project_channel"
 *                   medium:
 *                     type: string
 *                     description: Medium blog or URL.
 *                     example: "https://medium.com/@project_blog"
 *                   youtube:
 *                     type: string
 *                     description: YouTube channel or video URL.
 *                     example: "https://youtube.com/channel/project_channel"
 *     responses:
 *       200:
 *         description: Successfully added a new project and returned the project ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: New project was added successfully
 *                 data:
 *                   type: string
 *                   description: The ID of the newly added project.
 *                   example: "7242012c-511a-410a-b99b-7f2ecf0d238n"
 *       400:
 *         description: Bad request due to invalid payload or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid input data
 *       500:
 *         description: Server error while adding the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unable to add new project
 */
projectRouter.post('/new', addNewProject)

/**
 * @swagger
 * /api/project/delete:
 *   post:
 *     summary: Delete a project
 *     description: Deletes a project by its ID.
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the project to be deleted.
 *                 example: "7242012c-511a-410a-b99a-7f2ecf0d238b"
 *     responses:
 *       200:
 *         description: Successfully deleted the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Project deleted successfully
 *       400:
 *         description: Bad request due to invalid payload or missing fields.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid project ID
 *       404:
 *         description: Project not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Project not found
 *       500:
 *         description: Server error while deleting the project.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Unable to delete project
 */
projectRouter.post('/delete', deleteProject)

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: Project API
 *   version: 1.0.0
 *   description: API to manage and retrieve project information
 * paths:
 *   /api/project/getAll:
 *     get:
 *       summary: Retrieve all projects
 *       operationId: getAllProjects
 *       tags:
 *         - Project
 *       responses:
 *         '200':
 *           description: Successful response with the list of projects
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   message:
 *                     type: string
 *                     example: project list fetch successful
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Bitcoin
 *                         description:
 *                           type: string
 *                           example: Bitcoin is a leading cryptocurrency with significant market potential."
 *                         round:
 *                           type: string
 *                           enum:
 *                             - PRE_SEED
 *                             - SEED
 *                             - SERIES_A
 *                             - SERIES_B
 *                             - SERIES_C
 *                           example: PRE_SEED
 *         '500':
 *           description: Internal server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   message:
 *                     type: string
 *                     example: unable to fetch project list
 */
projectRouter.get('/getAll', getAllProjects)

export default projectRouter
