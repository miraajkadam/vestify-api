import { Decimal } from '@prisma/client/runtime/library'

export type GetCapitalsJoinedResponse = {
  id: string
  name: string
  description: string
  logoBase64: string
  subscriptionFee: Decimal
}[]

//#region Project Investment API Types
export type ProjectInvestmentPayload = {
  userId: string
  projectId: string
  amount: Decimal
  paymentCurrency: string
  paymentNetwork: string
  fromWalletKey: string
  toWalletKey: string
}

export type ProjectInvestmentResponse = {
  projectName: string
  amount: Decimal
  toWalletKey: string
  fromWalletKey: string
  paymentNetwork: string
  paymentCurrency: string
  transactionTimestamp: Date
  transactionId: string
}
//#endregion

//#region User Profile API Types
type TransactionSummary = {
  amount: number
  count: number
}

type DealSummary = {
  projName: string
  allocation: string
  tokenRecvd: number
  recEvm: string
  transaction: {
    contributed: TransactionSummary
    refunded: TransactionSummary
    otc: TransactionSummary
  }
}

type InvestmentSummary = {
  deals: number
  otcTrades: number
  totInvestment: number
  avgInvestment: number
}

type Wallet = {
  current: string
  last5Used: string[]
}

type UserInfo = {
  email: string
  discord: string
  x: string
  kycDone: boolean
}

export type UserProfileResponse = {
  info: UserInfo
  investmentSummary: InvestmentSummary
  wallet: Wallet
  dealsSummary: DealSummary[]
}
//#endregion
