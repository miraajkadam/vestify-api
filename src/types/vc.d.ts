export type AddNewVCPayload = {
  name: string
  description: string
  logoBase64: string
  subscriptionFee: number
  tags: string[]
  kycDone: boolean
}
