import { Chain } from '@prisma/client'

// #region AddWallet
type AddWalletPayload = {
  address: string
  chain: Chain

  accountId: string // Todo: pick account id from JWT through request cookie
}
// #endregion

// #region GetWallets
type GetWalletsPayload = {
  accountId: string
}

type GetWalletResponse = {
  address: string
  chain: Chain
}[]
// #endregion
