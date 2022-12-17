import { Request, Response, NextFunction } from 'express'
import { AnySchema } from 'yup'
import { Types } from 'mongoose'

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

export const uidValidation = (...args: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const results: string[] = []
    args.forEach(id => {
      if (!Types.ObjectId.isValid(req.params[id])) {
        results.push(`${id} of ${req.params[id]} is not a valid Object Id`)
      }
    })

    if (results.length) {
      return res.status(400).json({
        message: 'Invalid Param Id',
        results
      })
    }

    return next()
  }
}