import {
  Either,
  makeLeft,
  makeRight,
  Right,
  unwrapEither,
} from '../../shared/types/railway.error'
import { IUserLogin, QueryUser } from './user.interface'
import { UserDocument, Usermodel } from './user.schema'
import {
  ParseUserError,
  ParseUserIdError,
  ParseUserQueryError,
} from './user.validate'

export type CreateUserRepository = (
  either: Right<IUserLogin>
) => Promise<Either<ParseUserError, UserDocument>>

export type FindOneUserRepository = (
  either: Right<string>
) => Promise<Either<ParseUserIdError, UserDocument | null>>

export const createUserRepository = async (
  either: Right<IUserLogin>
): Promise<Either<ParseUserError, UserDocument>> => {
  try {
    const user = unwrapEither(either)
    const userCreated = (await Usermodel.create(user)) as UserDocument
    return makeRight(userCreated)
  } catch (error) {
    console.log('ERROR->', error)

    return makeLeft('CREATE_USER_ERROR')
  }
}

export const findOneUserRepository = async (
  either: Right<string>
): Promise<Either<ParseUserIdError, UserDocument | null>> => {
  try {
    const userId = unwrapEither(either)
    const user = (await Usermodel.findById(userId)) as UserDocument
    return makeRight(user)
  } catch (error) {
    return makeLeft('FIND_USER_ERROR')
  }
}

export type FindAllUsersRepository = (
  either: Right<QueryUser>
) => Promise<Either<ParseUserQueryError, Array<UserDocument> | null>>

export const findAllUsersRepository = async (
  either: Right<QueryUser>
): Promise<Either<ParseUserQueryError, Array<UserDocument> | null>> => {
  try {
    const query = unwrapEither(either)
    const users = await Usermodel.find(query)
    return makeRight(users)
  } catch (error) {
    return makeLeft('LIST_USER_ERROR')
  }
}
