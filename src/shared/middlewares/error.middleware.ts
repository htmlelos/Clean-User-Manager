import { Request, Response } from 'express'
import { CustomError, isCustomError } from '../types/custom.error'

export const routeNotFound = (request: Request, response: Response) => {
  response.status(404).send('Endpoint not found')
}

export const errorHandler = (
  error: Error | CustomError,
  request: Request,
  response: Response
) => {
  if (isCustomError(error)) {
    const { status, message } = error as CustomError
    response.status(status).send(message)
  }
  response.status(500).send('Internal Error')
}
