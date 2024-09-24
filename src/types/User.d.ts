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
