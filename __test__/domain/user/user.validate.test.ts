import { IUserLogin } from '../../../src/domain/user/user.interface'
import {
  CreateUserError,
  parseUser,
} from '../../../src/domain/user/user.validate'
import {
  isLeft,
  isRight,
  unwrapEither,
} from '../../../src/shared/types/custom.error'

describe('Validate User', () => {
  it('return status code 201 if User has all data valid', () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }

    const resultEither = parseUser(user as IUserLogin)
    if (isRight(resultEither)) {
      const result = unwrapEither(resultEither)
      const { username, password, confirmPassword } = result as IUserLogin
      expect(username).toBe('username@mail.com')
      expect(password).toBe('Pass2022$')
      expect(confirmPassword).toBe('Pass2022$')
    }
  })

  it('return status code 400 if User username is missing', () => {
    const user = {
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }

    const resultEither = parseUser(user as IUserLogin)
    if (isLeft(resultEither)) {
      const result = unwrapEither(resultEither)
      const error = result as CreateUserError
      expect(error).toBe('USERNAME_MISSING')
    }
  })

  it('return status code 400 if User password is missing', () => {
    const user = {
      username: 'username@mail.com',
      confirmPassword: 'Pass2022$',
    }

    const resultEither = parseUser(user as IUserLogin)
    if (isLeft(resultEither)) {
      const error = unwrapEither(resultEither) as CreateUserError
      expect(error).toBe('PASSWORD_MISSING')
    }
  })

  it('return status code 400 if user password confirmation is missing', () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
    }

    const resultEither = parseUser(user as IUserLogin)
    if (isLeft(resultEither)) {
      const error = unwrapEither(resultEither) as CreateUserError
      expect(error).toBe('CONFIRMATION_PASSWORD_MISSING')
    }
  })

  it('return status code 400 if User password and confirmation are different', () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: 'Pass2021$',
    }

    const resultEither = parseUser(user as IUserLogin)
    if (isLeft(resultEither)) {
      const error = unwrapEither(resultEither) as CreateUserError
      expect(error).toBe('PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME')
    }
  })

  it('return error if username is not a valid email', () => {
    const user = {
      username: 'username',
      password: 'Pass2020$',
      confirmPassword: 'Pass2020$',
    }

    const resultEither = parseUser(user as IUserLogin)
    if (isLeft(resultEither)) {
      const error = unwrapEither(resultEither) as CreateUserError
      expect(error).toBe('USERNAME_IS_NOT_VALID_EMAIL')
    }
  })
})
