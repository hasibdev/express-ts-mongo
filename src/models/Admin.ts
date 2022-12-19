import bcrypt from 'bcrypt'
import { Schema, model, Model } from 'mongoose'

interface IUser {
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
  verified?: boolean
  blocked?: boolean
  guard?: string
  resetPassToken?: string
  resetPassExpire?: Date
}

interface IUserMethods {
  matchPassword(password: string): Promise<boolean>
}

export interface UserModel extends Model<IUser, {}, IUserMethods> { }


const schema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provice a valid email']
  },
  phone: {
    type: String,
    trim: true,
    required: false,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    maxlength: 128,
    select: false
  },
  verified: {
    type: Boolean,
    default: false
  },
  blocked: {
    type: Boolean,
    default: false
  },
  guard: {
    type: String,
    default: 'admins'
  },
  resetPassToken: String,
  resetPassExpire: Date
})

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

schema.method('matchPassword', async function (password) {
  return await bcrypt.compare(password, this.password)
})

export default model<IUser, UserModel>('Admin', schema)