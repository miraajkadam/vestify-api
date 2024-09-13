export type ApiResponse<T> = {
  message: string
} & (ApiSuccessResponse<T> | ApiErrorResponse)

type ApiSuccessResponse<T> = {
  success: true
  data?: T
}

type ApiErrorResponse = {
  success: false
  stack?: string | false | undefined
}
