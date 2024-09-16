import { Router } from 'express'

import { addNewVC } from '@/controllers/vc'

const vcRouter = Router()

/**
 * @openapi
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
 *             required:
 *               - name
 *               - description
 *               - logoBase64
 *               - subscriptionFee
 *               - tags
 *               - kycDone
 *     responses:
 *       '200':
 *         description: Successfully created a new VC.
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
 *                   example: "successfully created a new vc"
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
 *                   example: "invalid payload"
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
 *                   example: "unable to create a new vc"
 *
 *     tags:
 *       - VC
 */
vcRouter.post('/new', addNewVC)

export default vcRouter
