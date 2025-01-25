import { Router } from 'express'

import {
  addNewProject,
  addPool,
  addVestingScheduleCon,
  deleteAllProjectDistributionPools,
  deleteProjectDistributionPool,
  deleteVestingSchedule,
  editVestingSchedule,
  getInvestmentStatsForProject,
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
 *                     example: "abc123"
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

projectRouter.delete('/:projectId/deleteAllDistPools', deleteAllProjectDistributionPools)

projectRouter.get('/distPool/:distPoolId/details', getProjectDistPoolDetails)

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
 * /api/project/{projectId}/addVestingSchedule:
 *   post:
 *     summary: Add a new vesting schedule to the project
 *     description: This endpoint allows you to add a new vesting schedule for a project, including batch intervals and individual vesting batches.
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
 *                 enum: ["MONTHLY", "QUARTERLY", "ANNUALLY"]
 *                 example: "MONTHLY"
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
 *         description: Project not found with the provided projectId.
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
 *         description: Internal server error while processing the request.
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
 *                   example: "Unable to add vesting schedule."
 */
projectRouter.post('/:projectId/addVestingSchedule', addVestingScheduleCon)

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
 *                 enum: ["MONTHLY", "QUARTERLY", "ANNUALLY"]
 *                 example: "MONTHLY"
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
