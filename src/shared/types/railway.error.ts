export type Left<T> = {
  left: T
  right?: never
}

export type Right<T> = {
  left?: never
  right: T
}

export type Either<T, U> = NonNullable<Left<T> | Right<U>>

export type UnwrapEither = <T, U>(e: Either<T, U>) => NonNullable<T | U>

export const unwrapEither: UnwrapEither = <T, U>({
  left,
  right,
}: Either<T, U>) => {
  if (right && left) {
    throw new Error(
      `Se han recibido los valores left y right simultaneamente en un tipo Either\nLeft: ${JSON.stringify(
        left
      )}\nRight:${JSON.stringify(right)}} `
    )
  }
  if (left) {
    return left
  }

  if (right) {
    return right
  }
  throw new Error('No se recibieron valores left o right en un tipo Either')
}

export const isLeft = <T, U>(e: Either<T, U>): e is Left<T> => {
  return e.left !== undefined
}

export const isRight = <T, U>(e: Either<T, U>): e is Right<U> => {
  return e.right !== undefined
}
export const makeLeft = <T>(value: T): Left<T> => ({ left: value })
export const makeRight = <U>(value: U): Right<U> => ({ right: value })
