import { Router } from 'express'

import { addWallet, getWallets } from '@/controllers/account.controller'

const accountRouter = Router()

/**
 * @swagger
 * /api/account/addWallet:
 *   post:
 *     summary: Add a new wallet to an account
 *     description: This endpoint allows users to add a new wallet (Ethereum, Solana, etc.) to their account. The wallet is associated with an account based on the provided `accountId`.
 *     tags:
 *       - Account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - chain
 *               - accountId
 *             properties:
 *               address:
 *                 type: string
 *                 description: The wallet address to be added.
 *                 example: "0x1234567890abcdef1234567890abcdef12345678"
 *               chain:
 *                 type: string
 *                 enum:
 *                   - EVM
 *                   - SOLANA
 *                 description: The blockchain type (e.g., Ethereum, Solana).
 *                 example: "EVM"
 *               accountId:
 *                 type: string
 *                 description: The unique identifier of the account. This will be extracted from the JWT token in the cookies.
 *                 example: "4b509982-5dc0-4999-8fe7-e347f9764288"
 *     responses:
 *       200:
 *         description: Successfully added the wallet to the account
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
 *                   example: "Successfully added wallet"
 *       400:
 *         description: Bad request. The request body is invalid or missing required fields.
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
 *                   example: "Invalid request body"
 *       401:
 *         description: Unauthorized. The user is not authenticated or the JWT token is invalid.
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
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error. An unexpected error occurred while processing the request.
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
 *                   example: "Internal server error"
 */
accountRouter.post('/addWallet', addWallet)

/**
 * @swagger
 * /api/account/{accountId}/getWallets:
 *   get:
 *     summary: Get all linked wallets for an account
 *     description: This endpoint retrieves all wallets that are linked to the specified account. The `accountId` is passed as a URL parameter.
 *     tags:
 *       - Account
 *     parameters:
 *       - in: path
 *         name: accountId
 *         required: true
 *         description: The unique identifier of the account whose linked wallets are to be fetched.
 *         schema:
 *           type: string
 *           example: "21a9ddea-81eb-48cb-86ba-a39ceb305bc4"
 *     responses:
 *       200:
 *         description: Successfully retrieved the linked wallets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     description: The wallet address.
 *                     example: "0x1234567890abcdef1234567890abcdef12345678"
 *                   chain:
 *                     type: string
 *                     enum:
 *                       - EVM
 *                       - SOLANA
 *                     description: The blockchain type (e.g., Ethereum, Solana).
 *                     example: "EVM"
 *       400:
 *         description: Bad request. The request is missing or invalid.
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
 *                   example: "Invalid account ID"
 *       401:
 *         description: Unauthorized. The user is not authenticated or the JWT token is invalid.
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
 *                   example: "Unauthorized"
 *       404:
 *         description: Account not found. The specified account ID does not exist in the system.
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
 *                   example: "Account doesn't exist"
 *       500:
 *         description: Internal server error. An unexpected error occurred while processing the request.
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
 *                   example: "Critical error"
 */
accountRouter.get('/:accountId/getWallets', getWallets)

export default accountRouter
