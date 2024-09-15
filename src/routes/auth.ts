import { Router } from 'express'

import { loginUser, logoutUser, signupUser } from '@/controllers/auth'
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

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *
 *     responses:
 *       200:
 *         description: User successfully logged out
 *       500:
 *         description: something went wrong
 */
authRouter.post('/logout', logoutUser)

export default authRouter
