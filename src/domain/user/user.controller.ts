import { Request, Response } from 'express'
import {
  isLeft,
  isStrictNever,
  unwrapEither,
} from '../../shared/types/custom.error'
import { IUser, IUserLogin } from './user.interface'
import { UserDocument } from './user.schema'
import {
  createUserService,
  findUserByIdService,
  findUserService,
} from './user.service'
import {
  GetUserError,
  GetUsersError,
  parseQuery,
  parseUser,
  parseUserId,
} from './user.validate'

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const { body } = request
  const userEither = parseUser(body)
  if (isLeft(userEither)) {
    const error = unwrapEither(userEither)
    return sendCreateUserErrorMessage(response)(error)
  }

  const user = unwrapEither(userEither)
  const userCreated = await createUserService(user)
  sendSuccessMessage(response)({
    status: 201,
    message: 'User Registered successfully',
  })(userCreated)
}

export const getUser = async (request: Request, response: Response) => {
  const { params } = request
  const { userId } = params
  const userIdEither = await parseUserId(userId)
  if (isLeft(userIdEither)) {
    const error = unwrapEither(userIdEither)
    return sendGetUserErrorMessage(response)(error)
  }

  const id = unwrapEither(userIdEither)
  const userEither = await findUserByIdService(id)
  if (isLeft(userEither)) {
    const error = unwrapEither(userEither)
    return sendSuccessMessage(response)({
      status: 204,
      message: 'User not found',
    })(error)
  }
  const userObtained = unwrapEither(userEither)
  sendSuccessMessage(response)({
    status: 200,
    message: 'User Obtained successfully',
  })(userObtained)
}

export const getUsers = async (request: Request, response: Response) => {
  const { query } = request
  const queryEither = parseQuery(query)
  if (isLeft(queryEither)) {
    const error = unwrapEither(queryEither)
    return sendGetUsersErrorMessage(response)(error)
  }
  const queryUser = unwrapEither(queryEither)
  const userEither = await findUserService(queryUser)
  if (isLeft(userEither)) {
    const error = unwrapEither(userEither)
  }
  const usersObtained = unwrapEither(userEither)
  sendSuccessMessage(response)({
    status: 200,
    message: 'Users Obtained successfully',
  })(usersObtained)
}

const sendCreateUserErrorMessage =
  (response: Response) => (error: string | IUserLogin) => {
    switch (error) {
      case 'USERNAME_MISSING': {
        response.status(400).send({ message: 'The username is missing' })
        return
      }
      case 'PASSWORD_MISSING': {
        response.status(400).send({ message: 'The password is missing' })
        return
      }
      case 'CONFIRMATION_PASSWORD_MISSING': {
        response
          .status(400)
          .send({ message: 'The password confirmation is missing' })
        return
      }
      case 'PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME': {
        response.status(400).send({
          message: 'The password and password confirmation must be the same',
        })
        return
      }
      case 'USERNAME_IS_NOT_VALID_EMAIL': {
        response.status(400).send({
          message: 'The username must be an valid email',
        })
        return
      }
      default:
        isStrictNever(error as never)
    }
  }

const sendGetUserErrorMessage =
  (response: Response) => (error: string | IUser) => {
    switch (error) {
      case 'USER_ID_MISSING': {
        response.status(400).send({ message: 'The user id is missing' })
        return
      }
      case 'USER_ID_INVALID': {
        response
          .status(400)
          .send({ message: 'The user id provided is invalid' })
        return
      }
      case 'USER_NOT_FOUND': {
        response.status(204).send({ message: 'The user was not found' })
        return
      }
      default:
        isStrictNever(error as never)
    }
  }

const sendGetUsersErrorMessage =
  (response: Response) => (error: string | IUser) => {
    if (error === 'USERS_NOT_FOUND') {
      return response.status(204).send({ message: 'The users were not found' })
    }
  }

const sendSuccessMessage =
  (response: Response) =>
  (error: { status: number; message: string }) =>
  (
    data:
      | UserDocument
      | UserDocument[]
      | NonNullable<GetUserError | undefined>
      | NonNullable<GetUsersError | undefined>
  ) => {
    const { status, message } = error
    response.status(status).send({ message, userCreated: data })
  }
