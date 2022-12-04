import mongoose from 'mongoose'
import { FullUser } from '../../../src/domain/user/user.interface'
import { UserDocument } from '../../../src/domain/user/user.schema'
const databaseUrl = 'mongodb://localhost/test_usermanager'
mongoose.connect(databaseUrl)

import { Usermodel } from '../../../src/domain/user/user.schema'

describe('User Model', () => {
  beforeAll(async () => {
    await Usermodel.deleteMany({})
  })

  afterEach(async () => {
    await Usermodel.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it('has a module', () => {
    expect(Usermodel).toBeDefined()
  })

  describe('get User', () => {
    it('gets a user', async () => {
      const _id = '9ec1cb82-2a58-4cd2-98ef-26cb487c9294'
      const user = {
        _id,
        username: 'username@mail.com',
        password: 'Pass2022$',
        active: true,
      }

      await Usermodel.create(user)
      const foundUser = (await Usermodel.findById(_id)) as UserDocument

      expect(user._id).toEqual(foundUser._id)
      expect(user.username).toEqual(foundUser.username)
      expect(user.password).toEqual(foundUser.password)
      expect(user.active).toEqual(foundUser.active)
    })
  })

  describe('save user', () => {
    it('saves a user', async () => {
      const _id = '9ec1cb82-2a58-4cd2-98ef-26cb487c9294'
      const user = {
        _id,
        username: 'username@mail.com',
        password: 'Pass2022$',
        active: true,
      }
      const userCreated = await Usermodel.create(user)

      expect(user._id).toEqual(userCreated._id)
      expect(user.username).toEqual(user.username)
      expect(user.password).toEqual(user.password)
      expect(user.active).toEqual(user.active)
    })
  })

  describe('update user', () => {
    it('updates a user', async () => {
      const _id = '9ec1cb82-2a58-4cd2-98ef-26cb487c9294'
      const user = {
        _id,
        username: 'username@mail.com',
        password: 'Pass2022$',
        active: true,
      }

      const userCreated = await Usermodel.create(user)
      userCreated.username = 'anotheruser@mail.com'
      const expectedUsername = userCreated.username
      const updatedUser = await userCreated.save()

      expect(user._id).toEqual(updatedUser._id)
      expect(expectedUsername).toEqual(updatedUser.username)
      expect(user.password).toEqual(updatedUser.password)
      expect(user.active).toEqual(updatedUser.active)
    })
  })

  describe('delete user', () => {
    it('deletes a user', async () => {
      const _id = '9ec1cb82-2a58-4cd2-98ef-26cb487c9294'
      const user = {
        _id,
        username: 'username@mail.com',
        password: 'Pass2022$',
        active: true,
      }

      await Usermodel.create(user)
      await Usermodel.deleteOne({ _id })
      const userFound = Usermodel.findById(_id) as unknown as FullUser

      expect(undefined).toEqual(userFound?._id)
      expect(undefined).toEqual(userFound?.username)
      expect(undefined).toEqual(userFound?.password)
      expect(undefined).toEqual(userFound?.active)
    })
  })
})
