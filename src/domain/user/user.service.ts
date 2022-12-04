import { Either, Right } from '../../shared/types/railway.error'
import { IUserLogin, QueryUser } from './user.interface'
import {
  CreateUserRepository,
  FindOneUserRepository,
  FindAllUsersRepository,
} from './user.repository'
import { UserDocument } from './user.schema'
import {
  ParseUserError,
  ParseUserIdError,
  ParseUserQueryError,
} from './user.validate'

export const createUserService = async (
  createUserRepository: CreateUserRepository,
  either: Right<IUserLogin>
): Promise<Either<ParseUserError, UserDocument>> => {
  return await createUserRepository(either)
}

export const findUserService = async (
  findOneUserRepository: FindOneUserRepository,
  either: Right<string>
): Promise<Either<ParseUserIdError, UserDocument | null>> => {
  return await findOneUserRepository(either)
}

export const listUsersService = async (
  findAllUsersRepository: FindAllUsersRepository,
  either: Right<QueryUser>
): Promise<Either<ParseUserQueryError, Array<UserDocument> | null>> => {
  return await findAllUsersRepository(either)
}
