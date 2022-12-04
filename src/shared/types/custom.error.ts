import { Either, isLeft, isRight, Left, Right } from './railway.error'

export const hasFailed = <T, U>(e: Either<T, U>): e is Left<T> => {
  return isLeft(e)
}

export const hasBeendSuccesful = <T, U>(e: Either<T, U>): e is Right<U> => {
  return isRight(e)
}

export const isStrictNever = (value: never): never => {
  throw new Error(
    `El caso por omisión alcanzado con un valor inesperado ${value}`
  )
}
