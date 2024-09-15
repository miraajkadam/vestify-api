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
 */
