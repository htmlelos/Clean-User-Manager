import { IUserLogin } from '../../../src/domain/user/user.interface'
import { parseUserBody } from '../../../src/domain/user/user.validate'
import {
  hasFailed,
  hasBeendSuccesful,
} from '../../../src/shared/types/custom.error'
import { unwrapEither } from '../../../src/shared/types/railway.error'

describe('Validate User', () => {
  it('return a valid user if has all data valid', () => {
    // Dado
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }
    // Cuando
    const response = parseUserBody(user)
    // Entonces
    if (hasBeendSuccesful(response)) {
      const result = unwrapEither(response)
      const { username, password, confirmPassword } = result
      expect(username).toBe('username@mail.com')
      expect(password).toBe('Pass2022$')
      expect(confirmPassword).toBe('Pass2022$')
    }
  })

  it('returns USERNAME_MISSING if User username is missing', () => {
    const user = {
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }

    const response = parseUserBody(user as IUserLogin)
    if (hasFailed(response)) {
      const result = unwrapEither(response)
      const error = result
      expect(error).toBe('USERNAME_MISSING')
    }
  })

  it('return PASSWORD_MISSING if User password is missing', () => {
    const user = {
      username: 'username@mail.com',
      confirmPassword: 'Pass2022$',
    }

    const response = parseUserBody(user as IUserLogin)
    if (hasFailed(response)) {
      const error = unwrapEither(response)
      expect(error).toBe('PASSWORD_MISSING')
    }
  })

  it('return CONFIRMATION_PASSWORD_MISSING if user password confirmation is missing', () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
    }

    const response = parseUserBody(user as IUserLogin)
    if (hasFailed(response)) {
      const error = unwrapEither(response)
      expect(error).toBe('CONFIRMATION_PASSWORD_MISSING')
    }
  })

  it('return PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME if User password and confirmation are different', () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: 'Pass2021$',
    }

    const resultEither = parseUserBody(user as IUserLogin)
    if (hasFailed(resultEither)) {
      const error = unwrapEither(resultEither)
      expect(error).toBe('PASSWORD_AND_CONFIRMATION_PASSWORD_ARE_NOT_SAME')
    }
  })

  it('return USERNAME_IS_NOT_A_VALID_EMAIL if username is not a valid email', () => {
    const user = {
      username: 'username',
      password: 'Pass2020$',
      confirmPassword: 'Pass2020$',
    }

    const resultEither = parseUserBody(user as IUserLogin)
    if (hasFailed(resultEither)) {
      const error = unwrapEither(resultEither)
      expect(error).toBe('USERNAME_IS_NOT_A_VALID_EMAIL')
    }
  })
})
