import { IUser } from '../../../src/domain/user/user.interface'
import { parseUser } from '../../../src/domain/user/user.validate'
import { CustomError } from '../../../src/shared/types/custom.error'

describe('Validate User', () => {
  it('User has all data valid', () => {
    const user: IUser = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }

    const result = parseUser(user)
    const { username, password, confirmPassword } = result as IUser
    expect(username).toBe('username@mail.com')
    expect(password).toBe('Pass2022$')
    expect(confirmPassword).toBe('Pass2022$')
  })

  it('return status code 400 if User username is missing', () => {
    const user = {
      password: 'Pass2022$',
      confirmPassword: 'Pass2022$',
    }

    const result = parseUser(user)
    const { status, message } = result as CustomError
    expect(status).toBe(400)
    expect(message).toBe('The username is required')
  })

  it('return status code 400 if User password is missing', () => {
    const user = {
      username: 'username@mail.com',
      confirmPassword: 'Pass2022$',
    }

    const result = parseUser(user)
    const { status, message } = result as CustomError
    expect(status).toBe(400)
    expect(message).toBe('The password is required')
  })

  it('return status code 400 if user password confirmation is missing', () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
    }

    const response = parseUser(user)
    const { status, message } = response as CustomError
    expect(status).toBe(400)
    expect(message).toBe('The password confirmation is required')
  })

  it('return status code 400 if User password and confirmation are different', () => {
    const user = {
      username: 'username@mail.com',
      password: 'Pass2022$',
      confirmPassword: 'Pass2021$',
    }

    const response = parseUser(user)
    const { status, message } = response as CustomError
    expect(status).toBe(400)
    expect(message).toBe(
      'The password and password confirmation must be equals'
    )
  })
})
