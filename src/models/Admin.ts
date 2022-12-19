import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'

const schema = new Schema({
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
  guard: {
    type: String,
    default: 'admins'
  }
})

schema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

export default model('Admin', schema)