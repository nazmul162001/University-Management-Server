/* eslint-disable no-console */
/* eslint-disable no-undef */
import { IGenericErrorMessage } from '../../interfaces/error'
import config from '../../config'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { ErrorRequestHandler } from 'express-serve-static-core'
import { errorLogger } from '../../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('Global Error Handler', err)
    : errorLogger.error('globalErrorHandler', err)

  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: 'errors',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(400).json({ error: err })
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
