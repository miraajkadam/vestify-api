import { Router } from 'express'

import { loginUser, logoutUser, signupUser } from '@/controllers/auth.controller'
import passport from '@/utils/passport'

const authRouter = Router()

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login an existing user
 *     description: Authenticate a user and return an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user.
 *                 example: StrongP@asdasdasdssw0rd!
 *     responses:
 *       200:
 *         description: Successfully authenticated and returned an access token.
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
 *                   example: successfully logged in
 *                 data:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNDIyMGY0MzEtOTU1ZS00OTdhLTliODItMzBkN2MzNTJjZWYzIn0sImlhdCI6MTcyNjU4NTQxN30.LZ77EbxAAIkKiHxyudicL1rBX9mhJCBreVgpfP3SLZQ
 *       401:
 *         description: Unauthorized due to incorrect credentials.
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
 *                   example: authentication failed
 *       500:
 *         description: Server error while trying to authenticate.
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
 *                   example: unable to login
 *     tags: [Auth]
 */
authRouter.post('/login', passport.authenticate('local'), loginUser)

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new user
 *     description: Create a new user and return an access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user.
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 description: The email address of the new user.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The password for the new user.
 *                 example: securePassword123
 *               accountType:
 *                 type: string
 *                 description: The type of account (VC or USER).
 *                 example: USER
 *                 enum:
 *                   - VC
 *                   - USER
 *     responses:
 *       200:
 *         description: Successfully created a new user and returned the access token.
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
 *                   example: successfully created a new user
 *                 data:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNDIyMGY0MzEtOTU1ZS00OTdhLTliODItMzBkN2MzNTJjZWYzIn0sImlhdCI6MTcyNjU4NTQxN30.LZ77EbxAAIkKiHxyudicL1rBX9mhJCBreVgpfP3SLZQ
 *       400:
 *         description: Invalid Payload.
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
 *                   example: Invalid Payload
 *       500:
 *         description: Server error while creating a new user.
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
 *                   example: unable to create a new user
 *     tags: [Auth]
 */
authRouter.post('/signup', signupUser)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     description: Logs out the user by destroying the session.
 *     responses:
 *       200:
 *         description: Successfully logged out the user.
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
 *                   example: logged out successfully
 *       500:
 *         description: Server error while logging out or destroying the session.
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
 *                   example: Logout failed or session destruction failed
 *     tags: [Auth]
 */
authRouter.post('/logout', logoutUser)

export default authRouter
