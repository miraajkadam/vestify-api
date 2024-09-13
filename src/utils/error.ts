import { NodeEnvironment } from './common'

export const createErrorResponse = (message: string, stack?: string, status: number = 500) => ({
  message,
  stack: process.env.NODE_ENV !== NodeEnvironment.PRODUCTION && stack,
  status,
})
