import { isValid } from 'date-fns/fp'
import { Types } from 'mongoose'
import { Either, makeLeft, makeRight } from '../../shared/types/custom.error'
import { IUserLogin, QueryUser } from './user.interface'

const ObjectId = Types.ObjectId

export type CreateUserError =
  | 'USERNAME_MISSING'
  | 'PASSWORD_MISSING'
  | 'CONFIRMATION_PASSWORD_MISSING'
  | 'PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME'
  | 'USERNAME_IS_NOT_VALID_EMAIL'

export type GetUserError =
  | 'USER_ID_MISSING'
  | 'USER_ID_INVALID'
  | 'USER_NOT_FOUND'

export type GetUsersError = 'USERS_NOT_FOUND'

export const parseUser = (
  user: IUserLogin
): Either<CreateUserError, IUserLogin> => {
  const { username, password, confirmPassword } = user

  if (!isNullOrUndefined(username)) {
    return makeLeft('USERNAME_MISSING')
  }
  if (isValidEmail(username)) {
    return makeLeft('USERNAME_IS_NOT_VALID_EMAIL')
  }
  if (!isNullOrUndefined(password) || !isString(password)) {
    return makeLeft('PASSWORD_MISSING')
  }
  if (!isNullOrUndefined(confirmPassword)) {
    return makeLeft('CONFIRMATION_PASSWORD_MISSING')
  }
  if (!stringAreEqual(password, confirmPassword)) {
    return makeLeft('PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME')
  }

  return makeRight({ username, password, confirmPassword })
}

export const parseUserId = async (
  id: string
): Promise<Either<GetUserError, string>> => {
  if (!isNullOrUndefined(id)) {
    return makeLeft('USER_ID_MISSING')
  }
  if (!isValidMongooseId(id)) {
    return makeLeft('USER_ID_INVALID')
  }
  return makeRight(id)
}

export const parseQuery = (query: QueryUser) => {
  const { username, active, createdAt } = query
  //TODO: Verificar si createdAt es una fecha valida
  if (isValidDate(createdAt)) {
    return makeLeft('DATE_INVALID')
  }
  return makeRight(query)
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
