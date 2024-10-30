import { Router } from 'express'

import {
  addNewVC,
  getAllVC,
  getVCProfileById,
  getVCProjectsById,
} from '@/controllers/vc.controller'

const vcRouter = Router()

/**
 * @swagger
 * /api/vc/new:
 *   post:
 *     summary: Create a New VC
 *     description: Adds a new VC entity to the database with the provided details.
 *     operationId: addNewVC
 *     requestBody:
 *       description: Payload for creating a new VC.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "87c107e4-e55e-47df-a68e-70a1a53be7b7"
 *               name:
 *                 type: string
 *                 example: "Innovative Ventures"
 *               description:
 *                 type: string
 *                 example: "A leading VC firm focusing on tech startups."
 *               logoBase64:
 *                 type: string
 *                 example: "iVBORw0KGgoAAAANSUhEUgAAAAU..."
 *               subscriptionFee:
 *                 type: number
 *                 format: float
 *                 example: 5000.00
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tech", "startups", "innovation"]
 *               kycDone:
 *                 type: boolean
 *                 example: true
 *               socials:
 *                 type: object
 *                 properties:
 *                   x:
 *                     type: string
 *                     example: "https://twitter.com/username"
 *                   instagram:
 *                     type: string
 *                     example: "https://instagram.com/project_handle"
 *                   discord:
 *                     type: string
 *                     example: "https://discord.gg/project_invite"
 *                   telegram:
 *                     type: string
 *                     example: "https://t.me/project_channel"
 *                   medium:
 *                     type: string
 *                     example: "https://medium.com/@project_blog"
 *                   youtube:
 *                     type: string
 *                     example: "https://youtube.com/channel/project_channel"
 *                   website:
 *                     type: string
 *                     example: "https://www.website.com/profile/"
 *                 required: []
 *             required:
 *               - name
 *               - description
 *               - logoBase64
 *               - subscriptionFee
 *               - tags
 *               - kycDone
 *     responses:
 *       '200':
 *         description: Successfully added data for the new VC.
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
 *                   example: "Successfully added data for the new VC."
 *       '400':
 *         description: Invalid payload or request parameters.
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
 *         description: Given VC Id account not found.
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
 *                   example: "VC Account not found"
 *       '500':
 *         description: Internal server error or unable to process request.
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
 *                   example: "Unable to add data for the new VC"
 *
 *     tags:
 *       - VC
 */
vcRouter.post('/new', addNewVC)

/**
 * @swagger
 * /api/vc/getAll:
 *   get:
 *     summary: Retrieve all Venture Capitalists (VCs)
 *     description: Fetch a list of all VCs from the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of VCs.
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
 *                   example: VCs list fetch successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Innovative Ventures
 *                       description:
 *                         type: string
 *                         example: A leading VC firm focusing on tech startups.
 *                       logoBase64:
 *                         type: string
 *                         example: iVBORw0KGgoAAAANSUhEUgAAAAU...
 *                       subscriptionFee:
 *                         type: string
 *                         example: 5000
 *                       id:
 *                         type: string
 *                         example: 7242012c-511a-410a-b99b-7f2ecf0d238b
 *       '400':
 *         description: Unable to get all VCs
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
 *                   example: "something went wrong."
 *       '404':
 *         description: No VCs found
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
 *                   example: "No VCs found"
 *       '500':
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
 *                   example: "Unable to get all VCs"
 *     tags:
 *       - VC
 */
vcRouter.get('/getAll', getAllVC)

/**
 * @swagger
 * /api/vc/{vcId}/profile:
 *   get:
 *     summary: Retrieve VC Profile by ID
 *     description: Fetches the VC profile details and associated projects using the provided VC ID.
 *     operationId: getVCProfileById
 *     parameters:
 *       - name: vcId
 *         in: path
 *         description: The ID of the VC profile to retrieve. Must be a valid GUID.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *     responses:
 *       '200':
 *         description: Successfully retrieved VC profile details and associated projects.
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
 *                   example: "Successfully retrieved the VC profile."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "5a93b9dc-d106-4870-8f6c-c978f21471ea"
 *                     description:
 *                       type: string
 *                       example: "A leading VC firm focusing on tech startups."
 *                     logoBase64:
 *                       type: string
 *                       format: byte
 *                       example: "iVBORw0KGgoAAAANSUhEUgAAAAU..."
 *                     name:
 *                       type: string
 *                       example: "Innovative Ventures"
 *                     subscriptionFee:
 *                       type: string
 *                       format: decimal
 *                       example: "5000"
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["tech", "startups", "innovation"]
 *                     kycDone:
 *                       type: boolean
 *                       example: true
 *                     projects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             example: "4b509982-5dc0-4999-8fe7-e347f9764288"
 *                           name:
 *                             type: string
 *                             example: "Bitcoin 3"
 *                       example:
 *                         - id: "4b509982-5dc0-4999-8fe7-e347f9764288"
 *                           name: "Bitcoin"
 *                         - id: "c78e782a-bdca-4969-9d31-74265e27ada2"
 *                           name: "Ethereum"
 *                     vcId:
 *                       type: string
 *                       format: uuid
 *                       example: "5a93b9dc-d106-4870-8f6c-c978f21471ea"
 *                     social:
 *                       type: object
 *                       properties:
 *                         discord:
 *                           type: string
 *                           example: "https://discord.gg/project_invite"
 *                         x:
 *                           type: string
 *                           example: "https://twitter.com/username"
 *                         telegram:
 *                           type: string
 *                           example: "https://t.me/project_channel"
 *                         linkedin:
 *                           type: string
 *                           example: "https://www.linkedin.com/in/firstname-lastname/"
 *       '400':
 *         description: Bad request if the VC ID is invalid or missing.
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
 *                   example: "Invalid VC ID format."
 *       '404':
 *         description: Not Found if the VC profile with the given ID does not exist.
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
 *                   example: "VC profile not found."
 *       '500':
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
 *                   example: "An error occurred while retrieving the VC profile."
 *     tags:
 *       - VC
 */
vcRouter.get('/:vcId/profile', getVCProfileById)

/**
 * @swagger
 * /api/vc/{vcId}/projects:
 *   get:
 *     summary: Retrieve Projects associated to a VC by VC ID
 *     description: Fetches a list of projects associated with the specified VC (Venture Capital) ID.
 *     operationId: getVCProjectsById
 *     parameters:
 *       - name: vcId
 *         in: path
 *         description: The unique identifier of the VC whose projects are to be retrieved. Must be a valid GUID.
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "4b509982-5dc0-4999-8fe7-e347f9764288"
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of projects associated with the VC ID.
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
 *                   example: "Project retrieval successful."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "4b509982-5dc0-4999-8fe7-e347f9764288"
 *                       name:
 *                         type: string
 *                         example: "Bitcoin 3"
 *                       description:
 *                         type: string
 *                         example: "Bitcoin cryptocurrency"
 *                       round:
 *                         type: string
 *                         enum:
 *                           - PRE_SEED
 *                           - SEED
 *                           - SERIES_A
 *                           - SERIES_B
 *                           - SERIES_C
 *                         example: "PRE_SEED"
 *         examples:
 *           success:
 *             summary: A successful response
 *             value:
 *               {
 *                 "success": true,
 *                 "message": "Project retrieval successful.",
 *                 "data": [
 *                   {
 *                     "id": "4b509982-5dc0-4999-8fe7-e347f9764288",
 *                     "name": "Bitcoin 3",
 *                     "description": "Bitcoin cryptocurrency",
 *                     "round": "PRE_SEED"
 *                   },
 *                   {
 *                     "id": "c78e782a-bdca-4969-9d31-74265e27ada2",
 *                     "name": "Bitcoin 3",
 *                     "description": "Bitcoin cryptocurrency",
 *                     "round": "PRE_SEED"
 *                   },
 *                   {
 *                     "id": "af54906c-923e-4241-9cc0-4a3243e05f2d",
 *                     "name": "Bitcoin 3",
 *                     "description": "Bitcoin cryptocurrency",
 *                     "round": "PRE_SEED"
 *                   },
 *                   {
 *                     "id": "6d973937-e1d0-4c3a-9743-38c239d503ba",
 *                     "name": "Bitcoin 3",
 *                     "description": "Bitcoin cryptocurrency",
 *                     "round": "PRE_SEED"
 *                   },
 *                   {
 *                     "id": "115c3cab-bf6f-444c-abc3-3f8318cb3df5",
 *                     "name": "Bitcoin 3",
 *                     "description": "Bitcoin cryptocurrency",
 *                     "round": "PRE_SEED"
 *                   },
 *                   {
 *                     "id": "c8d7ec40-9667-4d04-af30-772778cb3bf2",
 *                     "name": "Bitcoin 3",
 *                     "description": "Bitcoin cryptocurrency",
 *                     "round": "PRE_SEED"
 *                   },
 *                   {
 *                     "id": "4a9e2025-ce57-452a-8677-e721542973a6",
 *                     "name": "Bitcoin 3",
 *                     "description": "Bitcoin cryptocurrency",
 *                     "round": "PRE_SEED"
 *                   },
 *                   {
 *                     "id": "6c8af815-e915-4169-b442-547abdf419cf",
 *                     "name": "Bitcoin 3",
 *                     "description": "Bitcoin cryptocurrency",
 *                     "round": "PRE_SEED"
 *                   }
 *                 ]
 *               }
 *       '400':
 *         description: Bad request if the VC ID is invalid or missing.
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
 *                   example: "Invalid VC ID format."
 *       '404':
 *         description: Not Found if no projects are found for the given VC ID.
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
 *                   example: "No projects found for the given VC ID."
 *       '500':
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
 *                   example: "An error occurred while retrieving the projects."
 *     tags:
 *       - VC
 */
vcRouter.get('/:vcId/projects', getVCProjectsById)

export default vcRouter
