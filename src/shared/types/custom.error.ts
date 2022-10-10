export interface CustomError {
  status: number
  message: string
}

export const createCustomError = (
  status: number,
  message: string
): CustomError => {
  const error: CustomError = { status, message }
  return error
}

export const isCustomError = <T>(error: T | CustomError) => {
  return (<CustomError>error).status !== undefined
}
