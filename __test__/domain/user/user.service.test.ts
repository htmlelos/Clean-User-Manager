import { model } from 'mongoose'

const userModelMock = {
  create: jest.fn(() => userModelMock),
  getAll: jest.fn(() => userModelMock),
  getOne: jest.fn(() => userModelMock),
}

const modelMock = model as jest.Mock
modelMock.mockReturnValue(userModelMock)

import { userRepository } from '../user/user.repository.ts'

beforeEach(() => {
  userModelMock.create.mockClear()
  userModelMock.getAll.mockClear()
  userModelMock.getOne.mockClear()
  modelMock.mockClear()
})

describe('User Service', () => {
  describe('Get all users', () => {
    it('should return the list of users', () => {
      const response = await UserService.getAll()
      const { users } = response

      expect(userModelMock.find).toBeCalledTimes(1)

      expect(userModelMock.find).toBeCalledWith()
    })

    it('should return an empty array if no there are users', () => {
      userModelMock.limit.mockResolvedValue([])

      const response = await UserService.getAll()
      const { users } = response
      expect(result)
    })
  })
})
