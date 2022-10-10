import { createCustomError, CustomError } from '../../shared/types/custom.error'
import { IUser } from './user.interface'

export const parseUser = (user: unknown): IUser | CustomError => {
  const { username, password, confirmPassword } = user as IUser

  if (!username) {
    return createCustomError(400, 'The username is required')
  }
  const REGEX_EMAIL = /^\S+@\S+.\S+$/
  if (!username.match(REGEX_EMAIL)) {
    return createCustomError(400, 'The username is not a valid email address')
  }
  if (!password) {
    return createCustomError(400, 'The password is required')
  }
  if (!confirmPassword) {
    return createCustomError(400, 'The password confirmation is required')
  }

  if (password !== confirmPassword) {
    return createCustomError(
      400,
      'The password and password confirmation must be equals'
    )
  }
  return { username, password, confirmPassword } as IUser
}
