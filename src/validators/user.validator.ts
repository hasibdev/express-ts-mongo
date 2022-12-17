import { object, string, ValidationError } from 'yup'
import User from '../models/User'

export const createUserSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required().email().test(async (email) => {
    try {
      const user = await User.exists({ email })
      if (user) return new ValidationError('Email already exits', email, 'email', 'unique')
      else return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }),
  password: string().required().min(6).max(180),
  phone: string().nullable()
})
