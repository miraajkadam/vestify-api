import { type Request, type Response } from 'express'

import { validateAddWalletPayload } from '@/helpers/account.helper'
import { AccountService } from '@/services'
import {
  AddWalletPayload,
  GetWalletResponse,
  GetWalletsPayload as GetWalletsParams,
} from '@/types/Account'
import ApiResponse from '@/utils/ApiResponse'
import { isValidGuid } from '@/utils/common'

export const addWallet = async (
  req: Request<null, ApiResponse<void>, AddWalletPayload, null>,
  res: Response<ApiResponse<void>>
) => {
  const apiResponse = new ApiResponse(res)

  try {
    const isValidPayload = validateAddWalletPayload(req.body)
    if (!isValidPayload) return apiResponse.error('Invalid payload')

    const { accountId, address, chain } = req.body

    const accountService = new AccountService()

    const outcome = await accountService.linkAddToAccInDb(accountId, chain, address)

    if (!outcome) return apiResponse.error('unable to add wallet')

    return apiResponse.success('successfully added wallet')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('unable to add wallet', error)
  }
}

export const getWallets = async (
  req: Request<GetWalletsParams, ApiResponse<GetWalletResponse>, null, null>,
  res: Response<ApiResponse<GetWalletResponse>>
) => {
  const apiResponse = new ApiResponse<GetWalletResponse>(res)

  try {
    const { accountId } = req.params

    if (!isValidGuid(accountId)) return apiResponse.error('Invalid payload')

    const accountService = new AccountService()

    const accountExists = await accountService.checkAccExstByIdInDb(accountId)

    if (!accountExists) return apiResponse.error(`Account doesn't exist`)

    const linkedWallets = await accountService.getLinkdWalletsFromDb(accountId)

    if (!linkedWallets.length) return apiResponse.error('No linked wallets')

    return apiResponse.successWithData(linkedWallets, 'Attached wallets fetched successful')
  } catch (ex: unknown) {
    const error = ex as Error

    return apiResponse.critical('Unable to fetch linked wallets', error)
  }
}
