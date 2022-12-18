import { object, string, ValidationError, ref } from 'yup'
import User from '../models/User'

export const userLoginSchema = object().shape({
  email: string().email().required(),
  password: string().required()
})

export const userSignupSchema = object().shape({
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
  phone: string().nullable(),
  password: string().required().min(6).max(180),
  repeat_password: string().required().oneOf([ref('password')], 'Your passwords do not match.'),
})