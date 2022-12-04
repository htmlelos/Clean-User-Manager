import mongoose, { Document, Schema } from 'mongoose'
import { FullUser } from './user.interface'

export type UserDocument = FullUser & Document

const UserSchema = new Schema(
  {
    _id: { type: String, unique: true },
    username: { type: String, required: 'Username is required' },
    password: { type: String, required: 'Password is required' },
    // roles: Array<Role>,
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: String },
    updatedAt: { type: Date },
    updatedBy: { type: String },
  },
  { versionKey: false, collection: 'users' }
)

export const Usermodel = mongoose.model<FullUser>('User', UserSchema)
