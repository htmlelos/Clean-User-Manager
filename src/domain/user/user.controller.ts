import { Request, Response } from 'express'
import { hasFailed } from '../../shared/types/custom.error'
import {
  createUserService,
  findUserService,
  listUsersService,
} from './user.service'
import {
  createdSuccessMessage,
  foundSuccessMessage,
  parseUserBody,
  parseUserId,
  parseUserQuery,
  sendFailedMessage,
} from './user.validate'
import {
  createUserRepository,
  findAllUsersRepository,
  findOneUserRepository,
} from './user.repository'

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const { body } = request
  const user = parseUserBody(body)
  if (hasFailed(user)) {
    return sendFailedMessage(response)(user)
  }

  const userCreated = await createUserService(createUserRepository, user)
  if (hasFailed(userCreated)) {
    return sendFailedMessage(response)(userCreated)
  }
  createdSuccessMessage(response)(userCreated)
}

export const getUser = async (request: Request, response: Response) => {
  const { params } = request
  const { userId } = params
  const id = await parseUserId(userId)
  if (hasFailed(id)) {
    return sendFailedMessage(response)(id)
  }

  const user = await findUserService(findOneUserRepository, id)
  if (hasFailed(user)) {
    return sendFailedMessage(response)(user)
  }
  foundSuccessMessage(response)(user)
}

export const getUsers = async (request: Request, response: Response) => {
  const { query } = request
  const queryUser = parseUserQuery(query)
  if (hasFailed(queryUser)) {
    return sendFailedMessage(response)(queryUser)
  }

  const user = await listUsersService(findAllUsersRepository, queryUser)
  if (hasFailed(user)) {
    return sendFailedMessage(response)(user)
  }
  foundSuccessMessage(response)(user)
}
