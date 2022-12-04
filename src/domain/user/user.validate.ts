import { isValid } from 'date-fns/fp'
import { Response } from 'express'
import { Types } from 'mongoose'
import { isStrictNever } from '../../shared/types/custom.error'
import {
  Either,
  makeLeft,
  makeRight,
  Right,
  unwrapEither,
} from '../../shared/types/railway.error'
import { IUserLogin, QueryUser } from './user.interface'
import { UserDocument } from './user.schema'
import { randomUUID as uuid } from 'crypto'

const ObjectId = Types.ObjectId

export type UserError =
  | 'USERNAME_MISSING'
  | 'PASSWORD_MISSING'
  | 'CONFIRMATION_PASSWORD_MISSING'
  | 'PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME'
  | 'USERNAME_IS_NOT_A_VALID_EMAIL'
  | 'USER_ID_MISSING'
  | 'USER_ID_INVALID'
  | 'CREATE_USER_ERROR'
  | 'USERS_WERE_NOT_FOUND'
  | 'DATE_INVALID'
  | 'USERNAME_MUST_BE_AN_STRING'
  | 'ACTIVE_MUST_BE_TRUE_OR_FALSE'
  | 'LIST_USER_ERROR'
  | 'FIND_USER_ERROR'

export type ParseUserError = Extract<
  UserError,
  | 'USERNAME_MISSING'
  | 'PASSWORD_MISSING'
  | 'CONFIRMATION_PASSWORD_MISSING'
  | 'PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME'
  | 'USERNAME_IS_NOT_A_VALID_EMAIL'
  | 'CREATE_USER_ERROR'
>

export type ParseUserIdError = Extract<
  UserError,
  'USER_ID_MISSING' | 'USER_ID_INVALID' | 'FIND_USER_ERROR' | 'DATE_INVALID'
>

export type ParseUserQueryError = Extract<
  UserError,
  | 'DATE_INVALID'
  | 'USERNAME_MUST_BE_AN_STRING'
  | 'ACTIVE_MUST_BE_TRUE_OR_FALSE'
  | 'LIST_USER_ERROR'
>

export const parseUserBody = (
  user: IUserLogin
): Either<ParseUserError, IUserLogin> => {
  const { username, password, confirmPassword } = user

  if (isNullOrUndefined(username)) {
    return makeLeft('USERNAME_MISSING')
  }
  if (!isValidEmail(username)) {
    return makeLeft('USERNAME_IS_NOT_A_VALID_EMAIL')
  }
  if (isNullOrUndefined(password)) {
    return makeLeft('PASSWORD_MISSING')
  }
  if (isString(password) && isEmptyString(password)) {
    return makeLeft('PASSWORD_MISSING')
  }
  if (isNullOrUndefined(confirmPassword)) {
    return makeLeft('CONFIRMATION_PASSWORD_MISSING')
  }
  if (!stringAreEqual(password, confirmPassword)) {
    return makeLeft('PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME')
  }
  const _id = uuid()
  return makeRight({ _id, ...user })
}

export const parseUserId = async (
  id: string
): Promise<Either<ParseUserIdError, string>> => {
  if (isNullOrUndefined(id)) {
    return makeLeft('USER_ID_MISSING')
  }
  if (!isValidMongooseId(id)) {
    return makeLeft('USER_ID_INVALID')
  }
  return makeRight(id)
}

export const parseUserQuery = (
  query: QueryUser
): Either<ParseUserQueryError, QueryUser> => {
  const { username, active, createdAt } = query
  if (!isNullOrUndefined(username) && isString(username)) {
    return makeLeft('USERNAME_MUST_BE_AN_STRING')
  }
  if (!isNullOrUndefined(active) && isBoolean(active)) {
    return makeLeft('ACTIVE_MUST_BE_TRUE_OR_FALSE')
  }
  if (isValidDate(createdAt)) {
    return makeLeft('DATE_INVALID')
  }
  return makeRight(query)
}

export const isEmptyArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.length === 0
  }
  return false
}

export const isNullOrUndefined = (value: unknown) => {
  return value === null || value === undefined
}

export const isValidEmail = (email: string) => {
  const REGEX_EMAIL = /^\S+@\S+.\S+$/
  return email.match(REGEX_EMAIL)
}

export const isMissing = (value: unknown) => {
  return Boolean(value)
}

export const isString = (value: unknown) => {
  const type = typeof value
  return 'string' === type
}

export const isBoolean = (value: unknown) => {
  const type = typeof value
  return 'boolean' === type
}

export const isEmptyString = (value: string) => {
  return isString(value) ? value.length === 0 : false
}

export const stringAreEqual = (aString: string, anotherString: string) => {
  return aString === anotherString
}

export const isValidMongooseId = (id: string) => {
  return ObjectId.isValid(id)
}

export const isValidDate = (createdAt: unknown) => {
  return isValid(createdAt)
}

export const sendFailedMessage =
  (response: Response) => (either: Either<UserError, IUserLogin>) => {
    const error = unwrapEither(either)
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
      case 'USERNAME_IS_NOT_A_VALID_EMAIL': {
        response.status(400).send({
          message: 'The username must be an valid email',
        })
        return
      }
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
      case 'DATE_INVALID': {
        response.status(400).send({ message: 'The date is invalid' })
        return
      }
      case 'USERNAME_MUST_BE_AN_STRING': {
        response.status(400).send({ message: 'The username must be a string' })
        return
      }
      case 'ACTIVE_MUST_BE_TRUE_OR_FALSE': {
        response.status(400).send({ message: 'Active must be a boolean value' })
        return
      }
      case 'INTERNAL_ERROR': {
        response.status(500).send({ message: 'Internal Server error' })
        return
      }
      default:
        isStrictNever(error as never)
    }
  }

export const createdSuccessMessage =
  (response: Response) => (either: Right<UserDocument>) => {
    const data = unwrapEither(either)
    const status = 201
    const message = 'User created successfully'
    response.status(status).send({ message, userCreated: data })
  }

export const foundSuccessMessage =
  (response: Response) =>
  (either: Right<UserDocument | Array<UserDocument> | null>) => {
    const data = unwrapEither(either)
    if (isNullOrUndefined(data)) {
      const status = 204
      const message = 'User not found'
      response.status(status).send({ message, userFound: data })
    }
    if (isEmptyArray(data)) {
      const status = 204
      const message = 'Users  not found'
      response.status(status).send({ message, usersFound: data })
    }
    const status = 200
    const message = 'Success'
    response.status(status).send({ message, userFound: data })
  }
