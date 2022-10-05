import{ Document, Model, Schema } from "mongoose";
import IUser from "./user.types";

interface IUserDocument extends IUser, Document {}

const UserSchema = new Schema({
  username: {type: String, required: 'Username is required'},
  password: {type: String, required: 'Password is required'},
  // roles: Array<Role>,
  activated: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  createdBy: {type: String},
  updatedAt: {type: Date},
  updatedBy: {type: String}
})

export interface IUserModel extends Model<IUserDocument> {}