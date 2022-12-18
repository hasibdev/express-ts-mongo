import { object, string, ValidationError } from 'yup'


export const adminLoginSchema = object().shape({
  email: string().email().required(),
  password: string().required()
})
