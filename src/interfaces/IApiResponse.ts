import { type Response } from 'express'

interface IApiResponse<T> {
  success(message: string, status?: number): Response
  successWithData(data: T, message: string, status?: number): Response
  error(message: string, status?: number): Response
  critical(message: string, error: Error, status?: number): Response
}

export default IApiResponse
