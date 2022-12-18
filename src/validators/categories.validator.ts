import { object, string, } from 'yup'

export const createCategorySchema = object().shape({
  name: string().required(),
  description: string().nullable(),
})
