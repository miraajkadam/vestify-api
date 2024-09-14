import { type Response } from 'express'

import IApiResponse from '@/interfaces/IApiResponse'
import { NodeEnvironment } from './common'

/**
 * A utility class for managing and sending API responses.
 *
 * @template T - The type of data to be included in the success response.
 */
export default class ApiResponse<T> implements IApiResponse<T> {
  private res: Response
  private isSuccess: boolean
  private clientMessage: string
  private data?: T
  private status?: number
  private serverMessage?: string
  private exception?: Error

  /**
   * Creates an instance of ApiResponse.
   *
   * @param {Response} res - The Express response object.
   */
  constructor(res: Response) {
    this.res = res
    this.isSuccess = false
    this.clientMessage = ''
  }

  /**
   * Sends a successful response with a message.
   *
   * @param {string} message - The success message to be sent.
   * @param {number} [status=200] - The HTTP status code to be sent (default is 200).
   *
   * @returns The Express response object with the success JSON payload.
   */
  success = (
    message: string,
    status: number = 200
  ): Response<{
    success: boolean
    message: string
  }> => {
    this.isSuccess = true
    this.clientMessage = message
    this.status = status

    return this.res.status(this.status).json({
      success: this.isSuccess,
      message: this.clientMessage,
    })
  }

  /**
   * Sends a successful response with data and a message.
   *
   * @param {T} data - The data to be included in the response.
   * @param {string} message - The success message to be sent.
   * @param {number} [status=200] - The HTTP status code to be sent (default is 200).
   *
   * @returns The Express response object with the success JSON payload including data.
   */
  successWithData = (
    data: T,
    message: string,
    status: number = 200
  ): Response<{
    success: boolean
    message: string
    data: T
  }> => {
    this.isSuccess = true
    this.data = data
    this.clientMessage = message
    this.status = status

    return this.res.status(this.status).json({
      data: this.data,
      success: this.isSuccess,
      message: this.clientMessage,
    })
  }

  /**
   * Sends an error response with a message.
   *
   * @param {string} message - The error message to be sent.
   * @param {number} [status=400] - The HTTP status code to be sent (default is 400).
   *
   * @returns The Express response object with the error JSON payload.
   */
  error = (
    message: string,
    status: number = 400
  ): Response<{
    success: boolean
    message: string
  }> => {
    this.clientMessage = message
    this.status = status
    this.isSuccess = false

    return this.res.status(this.status).json({
      success: this.isSuccess,
      message: this.clientMessage,
    })
  }

  /**
   * Sends an exception response with a message and an error stack in development mode.
   *
   * @param {string} message - The error message to be sent.
   * @param {Error} error - The error object providing additional error details.
   * @param {number} [status=500] - The HTTP status code to be sent (default is 500).
   *
   * @returns The Express response object with the exception JSON payload including stack trace if not in production.
   */
  critical = (
    message: string,
    error: Error,
    status: number = 500
  ): Response<{
    success: boolean
    message: string
    stack?: string
  }> => {
    this.clientMessage = message
    this.status = status
    this.isSuccess = false
    this.exception = error

    this.serverMessage = `${this.clientMessage}, ErrorName: ${this.exception.name}, ErrorMessage: ${this.exception.message}, ErrorStack: ${this.exception.stack}`
    console.error(this.serverMessage)

    return this.res.status(this.status).json({
      success: this.isSuccess,
      message: this.clientMessage,
      stack: process.env.NODE_ENV !== NodeEnvironment.PRODUCTION && this.exception.stack,
    })
  }
}
