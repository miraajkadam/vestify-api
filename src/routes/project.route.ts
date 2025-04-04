import { Router } from 'express'

import {
  addNewProject,
  addPool,
  deleteAllProjectDistributionPools,
  deleteProject,
  deleteProjectDistributionPool,
  deleteVestingSchedule,
  editDistPool,
  editVestingSchedule,
  getAllProjects,
  getInvestmentStatsForProject,
  getProjectByProjectId,
  getProjectDistPoolDetails,
  getProjectDistPools,
  getVestingSchedule,
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
 *                     example: "1c30cc8e-ad15-480e-9593-82a3a8ecc82c"
 *               curProjTokenMetrics:
 *                 type: object
 *                 properties:
 *                   round:
 *                     type: string
 *                     description: The funding round for the token metrics.
 *                     example: "SEED"
 *                   price:
 *                     type: number
 *                     description: Price of the token.
 *                     example: 1.23
 *                   tgeUnlock:
 *                     type: number
 *                     description: Token Generation Event unlock percentage. (must be between 0-100)
 *                     example: 60
 *                   tge:
 *                     type: string
 *                     description: Date and time of the Token Generation Event.
 *                     example: "2024-08-28T12:20:13.264Z"
 *                   lockupPeriod:
 *                     type: number
 *                     description: Lockup period in days.
 *                     example: 180
 *                   releaseType:
 *                     type: string
 *                     description: The release type for the token (e.g., "QUARTERLY").
 *                     example: "QUARTERLY"
 *                   releaseMonths:
 *                     type: number
 *                     description: Number of months between each release.
 *                     example: 3
 *                   fdv:
 *                     type: number
 *                     description: Fully Diluted Valuation.
 *                     example: 1000000000
 *               pastProjTokenMetrics:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     price:
 *                       type: number
 *                       description: Price of the token for the past round.
 *                       example: 1.23
 *                     lockupPeriod:
 *                       type: number
 *                       description: Lockup period in days.
 *                       example: 180
 *                     releaseMonths:
 *                       type: number
 *                       description: Number of months between each release.
 *                       example: 3
 *                     releaseType:
 *                       type: string
 *                       description: The release type for the token (e.g., "QUARTERLY").
 *                       example: "QUARTERLY"
 *                     round:
 *                       type: string
 *                       description: The funding round for the token metrics.
 *                       example: "PRIVATE_3"
 *               roundDetails:
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
 *                   raiseAmount:
 *                     type: number
 *                     description: Amount to raise in the deal.
 *                     example: 123123123123
 *                   tokenTicker:
 *                     type: string
 *                     description: Token ticker for the project.
 *                     example: "FOMO"
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
 *                     example: "https://x.com/project_handle"
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
 *                   website:
 *                     type: string
 *                     description: Website link.
 *                     example: "https://www.example.com"
 *               projectWallet:
 *                 type: object
 *                 properties:
 *                   chain:
 *                     type: string
 *                     description: Blockchain chain (e.g., "EVM").
 *                     example: "EVM"
 *                   walletAddress:
 *                     type: string
 *                     description: Wallet address for the project.
 *                     example: "0x32Be343B94f860124dC4fEe278FDCBD38C102D88"
 *               onChain:
 *                 type: object
 *                 properties:
 *                   projectId:
 *                     type: string
 *                     description: The unique project ID on the blockchain.
 *                     example: "bdcdfb7e-379e-4d55-8fac-212422f61220"
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
 *                   example: "New project was added successfully"
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
 *                   example: "Invalid input data"
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
 *                   example: "Unable to add new project"
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
 *                     project:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: "Bitcoin"
 *                         description:
 *                           type: string
 *                           example: "Bitcoin is a leading cryptocurrency with significant market potential."
 *                         round:
 *                           type: string
 *                           example: "PRE_SEED"
 *                         categories:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Tech", "DEFI", "Crypto"]
 *                         tokensReceived:
 *                           type: string
 *                           example: "0/0"
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
 *                             example: "Venture Capital Inc."
 *                           logoBase64:
 *                             type: string
 *                             example: "b21hZSB3YSBtb3Ugc2hpbmRlaXJ1"
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

// #region distribution pools
/**
 * @swagger
 * /api/project/addPool:
 *   post:
 *     summary: Add a new distribution pool to a project
 *     description: This endpoint allows the creation of a new distribution pool associated with a project.
 *     tags: [Project]
 *     requestBody:
 *       description: Payload to add a new distribution pool
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Global Fund Pool"
 *               addresses:
 *                 type: array
 *                 items:
 *                   type: string
 *                   pattern: '^0x[a-fA-F0-9]{40}$'
 *                 example: ["0x1234abcd5678efgh", "0x9876zyxw4321kjl"]
 *               fee:
 *                 type: number
 *                 format: float
 *                 example: 0.05
 *               maxAllocation:
 *                 type: number
 *                 format: float
 *                 example: 1000000.00
 *               minAllocation:
 *                 type: number
 *                 format: float
 *                 example: 50000.00
 *               projectId:
 *                 type: string
 *                 example: "c87b0321-f22e-4bc6-929d-3a42fec2e227"
 *             required:
 *               - name
 *               - addresses
 *               - fee
 *               - maxAllocation
 *               - minAllocation
 *               - projectId
 *     responses:
 *       '200':
 *         description: Distribution pool successfully added
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
 *                   example: "Distribution pool added"
 *                 data:
 *                   type: string
 *                   example: "c87b0321-f22e-4bc6-929d-3a42fec2e227"
 *       '400':
 *         description: Invalid payload
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
 *                   example: "Invalid payload"
 *       '404':
 *         description: Project not found
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
 *       '500':
 *         description: Internal server error
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
 *                   example: "Unable to add distribution pool"
 */
projectRouter.post('/addPool', addPool)

/**
 * @swagger
 * /api/project/{projectId}/distPools:
 *   get:
 *     summary: Get the distribution pools of a project
 *     description: Retrieve the distribution pools associated with a specific project using the projectId.
 *     tags: [Project]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         description: The unique ID of the project to get distribution pools for.
 *         required: true
 *         schema:
 *           type: string
 *           example: "c87b0321-f22e-4bc6-929d-3a42fec2e227"
 *     responses:
 *       '200':
 *         description: Successfully retrieved the distribution pools for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Global Fund Pool"
 *                   addresses:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: "0x1234abcd5678efgh"
 *                   id:
 *                     type: string
 *                     example: "1c30cc8e-ad15-480e-9593-82a3a8ecc82c"
 *       '400':
 *         description: Invalid project ID format
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
 *                   example: "Invalid project Id"
 *       '404':
 *         description: Project not found
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
 *       '500':
 *         description: Internal server error
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
 *                   example: "Unable to retrieve distribution pools"
 */
projectRouter.get('/:projectId/distPools', getProjectDistPools)

/**
 * @swagger
 * /api/project/{projectId}/deleteAllDistPools:
 *   delete:
 *     summary: Delete all distribution pools of a project
 *     description: Deletes all distribution pools associated with a specific project using the projectId. Returns an error if the projectId is invalid or not found.
 *     tags: [Project]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         description: The unique ID of the project to delete distribution pools for.
 *         required: true
 *         schema:
 *           type: string
 *           example: "c87b0321-f22e-4bc6-929d-3a42fec2e227"
 *     responses:
 *       '200':
 *         description: Successfully deleted all distribution pools for the project
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
 *                   example: "Successfully deleted all distribution pools"
 *       '400':
 *         description: Invalid project ID format
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
 *                   example: "Invalid project Id"
 *       '404':
 *         description: Project not found
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
 *       '500':
 *         description: Internal server error while deleting distribution pools
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
 *                   example: "Unable to delete all distribution pools"
 */
projectRouter.delete('/:projectId/deleteAllDistPools', deleteAllProjectDistributionPools)

/**
 * @swagger
 * /api/project/distPool/{distPoolId}/details:
 *   get:
 *     summary: Get details of a specific distribution pool
 *     description: Fetches details of a specific distribution pool by its distPoolId, including associated investments and user details.
 *     tags: [Project]
 *     parameters:
 *       - name: distPoolId
 *         in: path
 *         description: The unique ID of the distribution pool to fetch details for.
 *         required: true
 *         schema:
 *           type: string
 *           example: "1c30cc8e-ad15-480e-9593-82a3a8ecc82c"
 *     responses:
 *       '200':
 *         description: Successfully retrieved the distribution pool details
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
 *                   example: "Successfully fetched distribution pool"
 *                 data:
 *                   type: object
 *                   properties:
 *                     info:
 *                       type: object
 *                       properties:
 *                         addresses:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "0x4b3316e6d309afcacdef6aedf839edfdf2a1cdad"
 *                         projectsId:
 *                           type: string
 *                           example: "0x6af5e22dfddadac2de6bc9ebe4b6f272ed06da80"
 *                         fee:
 *                           type: string
 *                           example: "92"
 *                         maxAllocation:
 *                           type: string
 *                           example: "7144"
 *                         minAllocation:
 *                           type: string
 *                           example: "50"
 *                         name:
 *                           type: string
 *                           example: "Founding Groups"
 *                     investments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           socials:
 *                             type: object
 *                             properties:
 *                               x:
 *                                 type: string
 *                                 example: "https://x.com/Vaughn.Beer"
 *                               discord:
 *                                 type: string
 *                                 example: "https://discord.gg/Vaughn.Beer"
 *                           investment:
 *                             type: object
 *                             properties:
 *                               amount:
 *                                 type: number
 *                                 example: 290.175
 *                               fromWallet:
 *                                 type: string
 *                                 example: "0x4b3316e6d309afcacdef6aedf839edfdf2a1cdad"
 *                               toWallet:
 *                                 type: string
 *                                 example: "0x8c7baecee03bbf680c7cdb2b5c6bbbe34db02ff3"
 *       '400':
 *         description: Invalid distribution pool ID format
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
 *                   example: "Invalid distribution pool id"
 *       '404':
 *         description: Distribution pool not found
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
 *                   example: "Distribution pool not found"
 *       '500':
 *         description: Internal server error while fetching distribution pool details
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
 *                   example: "Unable to fetch distribution pool"
 */
projectRouter.get('/distPool/:distPoolId/details', getProjectDistPoolDetails)

/**
 * @swagger
 * /api/project/distPool/{distPoolId}/edit:
 *   put:
 *     summary: Edit an existing distribution pool
 *     description: This endpoint allows editing the details of an existing distribution pool using the provided distPoolId.
 *     tags: [Project]
 *     parameters:
 *       - name: distPoolId
 *         in: path
 *         description: The unique ID of the distribution pool to edit.
 *         required: true
 *         schema:
 *           type: string
 *           example: "1c30cc8e-ad15-480e-9593-82a3a8ecc82c"
 *     requestBody:
 *       description: Payload to edit the distribution pool
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Fund Pool"
 *               addresses:
 *                 type: array
 *                 items:
 *                   type: string
 *                   pattern: '^0x[a-fA-F0-9]{40}$'
 *                 example: ["0x1234abcd5678efgh", "0x9876zyxw4321kjl"]
 *               fee:
 *                 type: number
 *                 format: float
 *                 example: 0.05
 *               maxAllocation:
 *                 type: number
 *                 format: float
 *                 example: 2000000.00
 *               minAllocation:
 *                 type: number
 *                 format: float
 *                 example: 100000.00
 *             required:
 *               - name
 *               - addresses
 *               - fee
 *               - maxAllocation
 *               - minAllocation
 *     responses:
 *       '200':
 *         description: Distribution pool successfully edited
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
 *                   example: "Distribution pool edited successfully"
 *                 data:
 *                   type: string
 *                   example: "1c30cc8e-ad15-480e-9593-82a3a8ecc82c"
 *       '400':
 *         description: Invalid payload
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
 *                   example: "Invalid payload"
 *       '404':
 *         description: Distribution pool not found
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
 *                   example: "Dist Pool not found"
 *       '500':
 *         description: Internal server error
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
 *                   example: "Unable to edit distribution pool"
 */
projectRouter.put('/distPool/:distPoolId/edit', editDistPool)

/**
 * @swagger
 * /api/project/distPool/{distPoolId}/delete:
 *   delete:
 *     summary: Delete a specific distribution pool
 *     description: Deletes a distribution pool associated with a specific project using the distPoolId. Returns an error if the distPoolId is invalid or the pool is not found.
 *     tags: [Project]
 *     parameters:
 *       - name: distPoolId
 *         in: path
 *         description: The unique ID of the distribution pool to delete.
 *         required: true
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       '200':
 *         description: Successfully deleted the distribution pool
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
 *                   example: "Successfully deleted distribution pool"
 *       '400':
 *         description: Invalid distribution pool ID format
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
 *                   example: "Invalid distribution pool id"
 *       '404':
 *         description: Distribution pool not found
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
 *                   example: "Distribution pool not found"
 *       '500':
 *         description: Internal server error while deleting distribution pool
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
 *                   example: "Unable to delete distribution pool"
 */
projectRouter.delete('/distPool/:distPoolId/delete', deleteProjectDistributionPool)

// #endregion

// #region Vesting schedules
/**
 * @swagger
 * /api/project/{projectId}/getVestingSchedule:
 *   get:
 *     summary: Get the vesting schedule for a specific project
 *     description: "Fetches the vesting schedule for a project based on its project ID."
 *     tags: [Project]
 *     parameters:
 *       - name: "projectId"
 *         in: "path"
 *         description: "Unique identifier for the project."
 *         required: true
 *         type: "string"
 *         example: "0xaabnjsnd"
 *         format: "uuid"
 *     responses:
 *       200:
 *         description: "Successfully retrieved the vesting schedule for the project."
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
 *                   example: "Fetched vesting schedule"
 *                 data:
 *                   type: "object"
 *                   properties:
 *                     batchInterval:
 *                       type: "string"
 *                       description: "The interval at which vesting batches occur (e.g., 'MONTHLY')."
 *                       enum: ["MONTHLY", "QUARTERLY", "ANNUALLY"]
 *                       example: "MONTHLY"
 *                     vestingBatches:
 *                       type: "array"
 *                       items:
 *                         type: "object"
 *                         properties:
 *                           name:
 *                             type: "string"
 *                             description: "The name of the vesting batch."
 *                             example: "Batch 1"
 *                           date:
 *                             type: "string"
 *                             format: "date-time"
 *                             description: "The date the batch will vest."
 *                             example: "2025-01-12T00:00:00Z"
 *                           percentage:
 *                             type: "number"
 *                             format: "float"
 *                             description: "The percentage of total vesting for this batch."
 *                             example: 10
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
 *                   example: "Invalid project Id"
 *       404:
 *         description: "Project not found or no vesting schedule exists."
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
 *                   example: "Unable to fetch vesting schedule"
 */
projectRouter.get('/:projectId/getVestingSchedule', getVestingSchedule)

/**
 * @swagger
 * /api/project/{projectId}/editVestingSchedule:
 *   put:
 *     summary: Edit the vesting schedule of a project
 *     description: This endpoint allows you to edit an existing vesting schedule for a project by its ID. It updates the vesting schedule with new batch information.
 *     tags: [Project]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         description: The unique ID of the project to which the vesting schedule will be added.
 *         required: true
 *         type: string
 *         example: "0xf9492"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batchInterval:
 *                 type: string
 *                 description: The interval for vesting batches (One of "MONTHLY", "QUARTERLY", "ANNUALLY").
 *                 enum: ['LINEAR', 'QUARTERLY', 'YEARLY']
 *                 example: "LINEAR"
 *               vestingBatches:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: The name of the vesting batch.
 *                       example: "Batch 1"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       description: The date for the vesting batch (in ISO 8601 format).
 *                       example: "2025-01-12T00:00:00Z"
 *                     percentage:
 *                       type: number
 *                       format: float
 *                       description: The percentage of tokens to be vested in this batch.
 *                       example: 100
 *             required:
 *               - batchInterval
 *               - vestingBatches
 *     responses:
 *       200:
 *         description: Successfully added the new vesting schedule.
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
 *                   example: "Vesting schedule added successfully."
 *       400:
 *         description: Invalid input data or missing required fields in the request payload.
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
 *                   example: "Invalid input data."
 *       404:
 *         description: Project or vesting schedule not found.
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
 *                   example: "Project not found."
 *       500:
 *         description: Internal server error while editing the vesting schedule.
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
 *                   example: "Unable to edit vesting schedule."
 */
projectRouter.put('/:projectId/editVestingSchedule', editVestingSchedule)

/**
 * @swagger
 * /api/project/{projectId}/deleteVestingSchedule:
 *   delete:
 *     summary: Delete the vesting schedule of a project
 *     description: This endpoint allows you to delete the vesting schedule associated with a specific project by its ID.
 *     tags: [Project]
 *     parameters:
 *       - name: projectId
 *         in: path
 *         description: The unique ID of the project whose vesting schedule is to be deleted.
 *         required: true
 *         type: string
 *         example: "0xf9492"
 *     responses:
 *       200:
 *         description: Successfully deleted the vesting schedule for the project.
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
 *                   example: "Vesting schedule deleted successfully."
 *       404:
 *         description: Project not found or no vesting schedule associated with the provided projectId.
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
 *                   example: "Vesting schedule not found for the specified project."
 *       500:
 *         description: Internal server error while attempting to delete the vesting schedule.
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
 *                   example: "Unable to delete vesting schedule."
 */
projectRouter.delete('/:projectId/deleteVestingSchedule', deleteVestingSchedule)

// #endregion

export default projectRouter
