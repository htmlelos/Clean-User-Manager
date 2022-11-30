import { Either, makeLeft, makeRight } from '../../shared/types/custom.error'
import { IUserLogin, QueryUser } from './user.interface'
import { UserDocument, Usermodel } from './user.schema'
import { GetUserError, GetUsersError } from './user.validate'

export const createUserService = async (
  user: IUserLogin
): Promise<UserDocument> => {
  return await Usermodel.create(user)
}

export const findUserByIdService = async (
  userId: string
): Promise<Either<GetUserError, UserDocument | null>> => {
  const user = await Usermodel.findById(userId)
  if (!user) {
    makeLeft('USER_NOT_FOUND')
  }
  return makeRight(user)
}

export const findUserService = async (
  query: QueryUser
): Promise<Either<GetUsersError, Array<UserDocument> | null>> => {
  const users = await Usermodel.find(query)
  if (users.length) {
    return makeLeft('USERS_NOT_FOUND')
  }
  return makeRight(users)
}
