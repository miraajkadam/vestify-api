import { Router } from 'express'

import {
  getCapitalsJoined,
  getUserProfile,
  investInProject,
  joinVC,
} from '@/controllers/user.controller'

const userRouter = Router()

/**
 * @swagger
 * /api/user/joinVC:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "Join a venture capitalist"
 *     description: "Allows a user to join a venture capitalist by providing their user ID and the VC ID."
 *     operationId: "joinVC"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               userId:
 *                 type: "string"
 *                 description: "The unique identifier of the user."
 *                 example: "372dc1a5-86fd-44f6-a366-cd88d1e99e1b"
 *               vcId:
 *                 type: "string"
 *                 description: "The unique identifier of the venture capitalist."
 *                 example: "892dc1a5-86fd-44f6-a366-cd88d1e99e1b"
 *     responses:
 *       200:
 *         description: "Successfully joined the venture capitalist."
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
 *                   example: "Successfully joined the capital"
 *       400:
 *         description: "Invalid input data."
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
 *                   example: "Unable to join the capital"
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
 *                   example: "Unable to join the capital"
 */
userRouter.post('/joinVC', joinVC)

/**
 * @swagger
 * /api/user/invest:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "Invest in a project"
 *     description: "Allows a user to invest in a project by providing investment details."
 *     operationId: "investInProject"
 *     produces:
 *       - "application/json"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: "object"
 *             properties:
 *               userId:
 *                 type: "string"
 *                 description: "The unique ID of the user."
 *                 example: "0f666bad-a8f9-4f09-93b2-80c549bb1c0d"
 *               projectId:
 *                 type: "string"
 *                 description: "The unique ID of the project."
 *                 example: "372dc1a5-86fd-44f6-a366-cd88d1e99e1b"
 *               amount:
 *                 type: "number"
 *                 format: "decimal"
 *                 description: "The amount to invest in the project."
 *                 example: 1000.50
 *               paymentCurrency:
 *                 type: "string"
 *                 description: "The currency used for the investment."
 *                 example: "USDT"
 *               paymentNetwork:
 *                 type: "string"
 *                 description: "The network used for the payment."
 *                 example: "Ethereum"
 *               fromWalletKey:
 *                 type: "string"
 *                 description: "The wallet key from which the investment is made."
 *                 example: "0xabc1234567890abcdef1234567890abcdef1234"
 *               toWalletKey:
 *                 type: "string"
 *                 description: "The wallet key to which the investment is sent."
 *                 example: "0xdef1234567890abcdef1234567890abcdef5678"
 *     responses:
 *       200:
 *         description: "Successfully invested into the project."
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
 *                   example: "Successfully invested into the project"
 *                 data:
 *                   type: "object"
 *                   properties:
 *                     projectName:
 *                       type: "string"
 *                       example: "Project Alpha"
 *                     amount:
 *                       type: "number"
 *                       format: "decimal"
 *                       example: 1000.50
 *                     toWalletKey:
 *                       type: "string"
 *                       example: "0xdef1234567890abcdef1234567890abcdef5678"
 *                     fromWalletKey:
 *                       type: "string"
 *                       example: "0xabc1234567890abcdef1234567890abcdef1234"
 *                     paymentNetwork:
 *                       type: "string"
 *                       example: "Ethereum"
 *                     paymentCurrency:
 *                       type: "string"
 *                       example: "B-USDT"
 *                     transactionTimestamp:
 *                       type: "string"
 *                       format: "date-time"
 *                       example: "2024-09-25T14:00:00Z"
 *                     transactionId:
 *                       type: "string"
 *                       example: "4ca6584-rfd4-hjhggigfd"
 *       400:
 *         description: "Invalid input data."
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
 *                   example: "Invalid payload"
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
 *                   example: "Unable to invest into the project"
 */
userRouter.post('/invest', investInProject)

/**
 * @swagger
 * /api/user/{userId}/getCapitalsJoined:
 *   get:
 *     tags:
 *       - "User"
 *     summary: "Get venture capitals joined by a user"
 *     description: "Retrieves a list of venture capitals that the specified user has joined."
 *     operationId: "getCapitalsJoined"
 *     produces:
 *       - "application/json"
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: "The unique ID of the user."
 *         schema:
 *           type: "string"
 *           example: "372dc1a5-86fd-44f6-a366-cd88d1e99e1b"
 *     responses:
 *       200:
 *         description: "Successfully fetched the list of capitals joined by the user."
 *         content:
 *           application/json:
 *             schema:
 *               type: "array"
 *               items:
 *                 type: "object"
 *                 properties:
 *                   id:
 *                     type: "string"
 *                     description: "The unique ID of the venture capitalist."
 *                     example: "372dc1a5-86fd-44f6-a366-cd88d1e99e1b"
 *                   name:
 *                     type: "string"
 *                     description: "The name of the venture capitalist."
 *                     example: "Venture Capital Firm A"
 *                   description:
 *                     type: "string"
 *                     description: "A brief description of the venture capitalist."
 *                     example: "Focused on technology startups."
 *                   logoBase64:
 *                     type: "string"
 *                     description: "Base64 encoded logo of the venture capitalist."
 *                     example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB..."
 *                   subscriptionFee:
 *                     type: "number"
 *                     format: "decimal"
 *                     description: "The subscription fee for joining the venture capitalist."
 *                     example: 1500.00
 *       400:
 *         description: "Invalid user ID."
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
 *                   example: "Invalid user Id"
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
 *                   example: "Unable to retrieve the list of capitals joined by user"
 */
userRouter.get('/:userId/getCapitalsJoined', getCapitalsJoined)

/**
 * @swagger
 * /api/user/{userId}/profile:
 *   get:
 *     summary: Retrieve user profile
 *     description: Retrieves the profile of a user including personal information, investment summary, wallet details, and deals summary.
 *     tags:
 *       - "User"
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose profile is to be retrieved.
 *         schema:
 *           type: string
 *           example: "c3b7d890-3c4e-4d97-8c49-2d556c831d57"
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
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
 *                   example: "Successfully fetched user profile"
 *                 data:
 *                   type: object
 *                   properties:
 *                     info:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: "jane.doe@example.com"
 *                         discord:
 *                           type: string
 *                           example: "https://discord.gg/janedoe"
 *                         x:
 *                           type: string
 *                           example: "https://twitter.com/janedoe"
 *                         kycDone:
 *                           type: boolean
 *                           example: true
 *                     investmentSummary:
 *                       type: object
 *                       properties:
 *                         deals:
 *                           type: integer
 *                           example: 25
 *                         otcTrades:
 *                           type: integer
 *                           example: 10
 *                         totInvestment:
 *                           type: number
 *                           format: decimal
 *                           example: 12500
 *                         avgInvestment:
 *                           type: number
 *                           format: decimal
 *                           example: 500
 *                     wallet:
 *                       type: object
 *                       properties:
 *                         current:
 *                           type: string
 *                           example: "0x4b0a9876543210abcdef1234567890abcdef1234"
 *                         last5Used:
 *                           type: array
 *                           items:
 *                             type: string
 *                             example: "0x4b0a9876543210abcdef1234567890abcdef1234"
 *                     dealsSummary:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           projName:
 *                             type: string
 *                             example: "GreenTech Innovations"
 *                           allocation:
 *                             type: string
 *                             example: "500"
 *                           tokenRecvd:
 *                             type: integer
 *                             example: 50
 *                           recEvm:
 *                             type: string
 *                             example: "0x4b0a9876543210abcdef1234567890abcdef1234"
 *                           transaction:
 *                             type: object
 *                             properties:
 *                               contributed:
 *                                 type: object
 *                                 properties:
 *                                   amount:
 *                                     type: number
 *                                     format: decimal
 *                                     example: 2500
 *                                   count:
 *                                     type: integer
 *                                     example: 1
 *                               refunded:
 *                                 type: object
 *                                 properties:
 *                                   amount:
 *                                     type: number
 *                                     format: decimal
 *                                     example: 500
 *                                   count:
 *                                     type: integer
 *                                     example: 1
 *                               otc:
 *                                 type: object
 *                                 properties:
 *                                   amount:
 *                                     type: number
 *                                     format: decimal
 *                                     example: 1000
 *                                   count:
 *                                     type: integer
 *                                     example: 1
 *       400:
 *         description: Invalid user ID
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
 *                   example: "Invalid user Id"
 *       500:
 *         description: Unable to fetch user profile
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
 *                   example: "Unable to fetch user profile"
 *                 stack:
 *                   type: string
 *                   example: "Error stack trace (if not in production)"
 */
userRouter.get('/:userId/profile', getUserProfile)

export default userRouter
