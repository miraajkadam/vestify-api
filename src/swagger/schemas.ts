/**
 * @swagger
 * components:
 *   schemas:
 *     AddProjectApiPayload:
 *       type: object
 *       properties:
 *         // Define properties here
 *     DeleteProjectApiPayload:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *     ProjectListResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           description:
 *             type: string
 *           round:
 *             type: string
 *     SignUpUserPayload:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - userType
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         userType:
 *           type: string
 *           enum: [USER, VC]
 *     AddNewVCPayload:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Innovative Ventures"
 *         description:
 *           type: string
 *           example: "A leading VC firm focusing on tech startups."
 *         logoBase64:
 *           type: string
 *           example: "iVBORw0KGgoAAAANSUhEUgAAAAU..."
 *         subscriptionFee:
 *           type: number
 *           format: float
 *           example: 5000.00
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["tech", "startups", "innovation"]
 *         kycDone:
 *           type: boolean
 *           example: true
 *       required:
 *         - name
 *         - description
 *         - logoBase64
 *         - subscriptionFee
 *         - tags
 *         - kycDone
 */
