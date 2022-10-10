import { NextFunction, Request, Response } from 'express'
import { isCustomError } from '../../shared/types/custom.error'
import { IUser } from './user.interface'
import { parseUser } from './user.validate'

export const validateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = await parseUser(request.body as IUser)
  if (isCustomError(user)) next(user)
  next()
}

export const validateUserMail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = await parseUser(request.body)
  if (isCustomError(user)) next(user)
  next()
}

export const createUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(201).send({ dmessage: 'User Registered successfully' })
  next()
}
