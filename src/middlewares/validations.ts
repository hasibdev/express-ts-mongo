import { Request, Response, NextFunction } from 'express'
import { AnySchema } from 'yup'

export const bodyValidation = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body, {
      abortEarly: false
    })
    return next()
  } catch (error: any) {
    return res.status(422).json(error.inner)
  }
}