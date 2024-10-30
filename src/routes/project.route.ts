import { Router } from 'express'

import {
  addNewProject,
  deleteProject,
  getAllProjects,
  getInvestmentStatsForProject,
  getProjectByProjectId,
} from '@/controllers/project.controller'

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
 *                   categories:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Tech", "DEFI", "Crypto"]
 *                   description:
 *                     type: string
 *                     description: A brief description of the project.
 *                     example: "Bitcoin is a leading cryptocurrency with significant market potential."
 *                   vcId:
 *                     type: string
 *                     description: The ID of the venture capital firm associated with the project.
 *                     example: "7242012c-511a-410a-b99b-7f2ecf0d238b"
 *               tokenMetrics:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     fdv:
 *                       type: string
 *                       description: Fully Diluted Valuation.
 *                       example: "1000000000"
 *                     price:
 *                       type: string
 *                       description: Price of the token.
 *                       example: "1.23"
 *                     tgeUnlock:
 *                       type: number
 *                       description: Token Generation Event unlock percentage. (must be between 0-100)
 *                       example: 80
 *                     tge:
 *                       type: string
 *                       description: Date and time of the Token Generation Event.
 *                       example: "2024-08-28T12:20:13.264Z"
 *                     round:
 *                       type: string
 *                       description: The funding round for the token metrics.
 *                       example: "PRE_SEED"
 *                     tgeSummary:
 *                       type: string
 *                       description: Summary of the Token Generation Event.
 *                       example: "This is TGE Summary"
 *                 example:
 *                   - fdv: "1000000000"
 *                     price: "1.23"
 *                     tgeUnlock: 80
 *                     tge: "2024-08-28T12:20:13.264Z"
 *                     round: "PRE_SEED"
 *                     tgeSummary: "This is TGE Summary for Pre Seed round"
 *                   - fdv: "2000000000"
 *                     price: "2.45"
 *                     tgeUnlock: 70
 *                     tge: "2024-09-15T10:00:00.000Z"
 *                     round: "SEED"
 *                     tgeSummary: "This is TGE Summary for Seed round"
 *                   - fdv: "1500000000"
 *                     price: "1.75"
 *                     tgeUnlock: 60
 *                     tge: "2024-10-05T14:30:00.000Z"
 *                     round: "PRIVATE_1"
 *                     tgeSummary: "Summary for the Series A round"
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
 *                   startDate:
 *                     type: string
 *                     description: Start date of the deal.
 *                     example: "2024-08-18T12:20:13.264Z"
 *                   endDate:
 *                     type: string
 *                     description: End date of the deal.
 *                     example: "2024-08-28T12:20:13.264Z"
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
 *                     imgBase64:
 *                       type: string
 *                       description: Image base64 of the team and advisor.
 *                       example: "b21hZSB3YSBtb3Ugc2hpbmRlaXJ1"
 *               partnersAndInvestors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     logoBase64:
 *                       type: string
 *                       description: Logo base64 of the partner or investor.
 *                       example: "b21hZSB3YSBtb3Ugc2hpbmRlaXJ1"
 *                     name:
 *                       type: string
 *                       description: Name of the partner or investor.
 *                       example: "Venture Capital Inc."
 *               projectSocials:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: string
 *                     description: Twitter/X handle or URL.
 *                     example: "https://twitter.com/username"
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
 *                   website:
 *                     type: string
 *                     description: Website link.
 *                     example: "https://website.com/profile/"
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

/**
 * @swagger
 * /api/project/{projectId}:
 *   get:
 *     summary: Retrieve a project by its ID
 *     description: Fetches the project details using the provided project ID.
 *     tags: [Project]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         description: The unique ID of the project to retrieve.
 *         example: 30aa20ff-81b8-4752-982e-dc9808a6af8e
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved project details.
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
 *                   example: Requested project fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     info:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Project Name"
 *                         description:
 *                           type: string
 *                           example: "Project Description"
 *                         round:
 *                           type: string
 *                           example: "Seed"
 *                         categories:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Tech", "DEFI", "Crypto"]
 *                     tokenMetrics:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           tge:
 *                             type: string
 *                             example: "2024-08-28T12:20:13.264Z"
 *                           tgeUnlock:
 *                             type: string
 *                             example: "80"
 *                           price:
 *                             type: string
 *                             example: "1.23"
 *                           round:
 *                             type: string
 *                             example: "PRE_SEED"
 *                           tgeSummary:
 *                             type: string
 *                             example: "This is TGE Summary for Pre Seed round"
 *                           fdv:
 *                             type: string
 *                             example: "1000000000"
 *                         example: [
 *                           {
 *                             tge: "2024-08-28T12:20:13.264Z",
 *                             tgeUnlock: "80",
 *                             price: "1.23",
 *                             round: "PRE_SEED",
 *                             tgeSummary: "This is TGE Summary for Pre Seed round",
 *                             fdv: "1000000000"
 *                           },
 *                           {
 *                             tge: "2024-09-15T10:00:00.000Z",
 *                             tgeUnlock: "70",
 *                             price: "2.45",
 *                             round: "SEED",
 *                             tgeSummary: "This is TGE Summary for Seed round",
 *                             fdv: "2000000000"
 *                           },
 *                           {
 *                             tge: "2024-10-05T14:30:00.000Z",
 *                             tgeUnlock: "60",
 *                             price: "1.75",
 *                             round: "PRIVATE_1",
 *                             tgeSummary: "Summary for the Series A round",
 *                             fdv: "1500000000"
 *                           }
 *                         ]
 *                     socialLink:
 *                       type: object
 *                       properties:
 *                         medium:
 *                           type: string
 *                           example: "https://medium.com/@project"
 *                         website:
 *                           type: string
 *                           example: "https://website.com/project"
 *                         x:
 *                           type: string
 *                           example: "https://twitter.com/project"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/project"
 *                     teamAndAdvisors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Team Member"
 *                           title:
 *                             type: string
 *                             example: "CEO"
 *                           imgBase64:
 *                             type: string
 *                             example: "data:image/png;base64,..."
 *                     partnersAndInvestors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Investor Name"
 *                           logoBase64:
 *                             type: string
 *                             example: "data:image/png;base64,..."
 *       400:
 *         description: Invalid project ID.
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
 *                   example: "Invalid project ID"
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
 *                   example: "Project not found"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Unable to fetch the project"
 */
projectRouter.get('/:projectId', getProjectByProjectId)

/**
 * @swagger
 * /api/project/{projectId}/investmentStats:
 *   get:
 *     tags:
 *       - "Project"
 *     summary: "Get investment statistics for a specific project"
 *     description: "Fetches detailed investment statistics for a project based on its ID."
 *     operationId: "getInvestmentStatsForProject"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: "projectId"
 *         in: "path"
 *         description: "Unique identifier for the project."
 *         required: true
 *         type: "string"
 *         example: 30aa20ff-81b8-4752-982e-dc9808a6af8e
 *         format: "uuid"
 *     responses:
 *       200:
 *         description: "Successfully retrieved project investment statistics."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 success:
 *                   type: "boolean"
 *                   example: true
 *                 message:
 *                   type: "string"
 *                   example: "Requested project fetched successfully"
 *                 data:
 *                   type: "object"
 *                   properties:
 *                     info:
 *                       type: "object"
 *                       properties:
 *                         name:
 *                           type: "string"
 *                           example: "Project Alpha"
 *                         categories:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Tech", "DEFI", "Crypto"]
 *                         round:
 *                           type: "string"
 *                           example: "Series A"
 *                     financial:
 *                       type: "object"
 *                       properties:
 *                         target:
 *                           type: "number"
 *                           example: 1000000
 *                         raised:
 *                           type: "number"
 *                           example: 750000
 *                         percentAchieved:
 *                           type: "number"
 *                           example: 75
 *                     tokenMetric:
 *                       type: "object"
 *                       properties:
 *                         price:
 *                           type: "string"
 *                           example: "0.1"
 *                     invest:
 *                       type: "object"
 *                       properties:
 *                         maximumAmount:
 *                           type: "string"
 *                           example: "10000"
 *                         minimumAmount:
 *                           type: "string"
 *                           example: "100"
 *                         poolFee:
 *                           type: "string"
 *                           example: "2"
 *                         acceptedTokens:
 *                           type: "string"
 *                           example: "ETH"
 *       400:
 *         description: "Invalid project ID supplied."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 success:
 *                   type: "boolean"
 *                   example: false
 *                 message:
 *                   type: "string"
 *                   example: "Invalid project ID"
 *       404:
 *         description: "Project not found."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 success:
 *                   type: "boolean"
 *                   example: false
 *                 message:
 *                   type: "string"
 *                   example: "Project not found"
 *       500:
 *         description: "Internal server error."
 *         content:
 *           application/json:
 *             schema:
 *               type: "object"
 *               properties:
 *                 success:
 *                   type: "boolean"
 *                   example: false
 *                 message:
 *                   type: "string"
 *                   example: "Unable to fetch the project"
 */
projectRouter.get('/:projectId/investmentStats', getInvestmentStatsForProject)

export default projectRouter
