import { Request, Response } from "express"

export const notFound = (req: Request, res: Response) => {
  return res.status(404).json({
    status: 404,
    message: 'Route Not found!'
  })
}