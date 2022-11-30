export type IUser = {
  username: string
  password: string
  active: boolean
  createdAt: Date
}

export type IUserLogin = Pick<IUser, 'username' | 'password'> & {
  confirmPassword: string
}

export type QueryUser = Partial<Omit<IUser, 'password'>>
