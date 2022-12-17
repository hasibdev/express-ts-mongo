import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'

const schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true
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