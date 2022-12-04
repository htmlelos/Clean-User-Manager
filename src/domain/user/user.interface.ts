export type User = {
  username: string
  password: string
  active: boolean
}

export type FullUser = User & {
  _id: string
  createdAt: Date
}

export type IUserLogin = Pick<User, 'username' | 'password'> & {
  confirmPassword: string
}

export type QueryUser = Partial<Omit<FullUser, 'password'>>
