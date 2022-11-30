import mongoose, { Schema, Document } from 'mongoose'
import { IUserLogin } from './user.interface'

export type UserDocument = IUserLogin & Document

const UserSchema = new Schema({
  username: { type: String, required: 'Username is required' },
  password: { type: String, required: 'Password is required' },
  // roles: Array<Role>,
  activated: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String },
  updatedAt: { type: Date },
  updatedBy: { type: String },
})

export const Usermodel = mongoose.model<IUserLogin>('User', UserSchema)
