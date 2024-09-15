import { Router } from 'express'

import { loginUser, signupUser } from '@/controllers/auth'
import passport from '@/utils/passport'

const authRouter = Router()

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */
authRouter.post('/login', passport.authenticate('local'), loginUser)

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignUpUserPayload'
 *     responses:
 *       200:
 *         description: User successfully created
 *       400:
 *         description: Invalid input
 */
authRouter.post('/signup', signupUser)

export default authRouter
