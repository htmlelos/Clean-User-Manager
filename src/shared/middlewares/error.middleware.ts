import { Request, Response, NextFunction } from 'express'

export const routeNotFound = (request: Request, response: Response) => {
  response.status(404).send('Endpoint not found')
}

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response
) => {
  // const { status, message } = error
  // response.status(status).send(message)
  console.log('ERROR->', error, '-', typeof error)
  response.status(500).send('Internal Error')
}
