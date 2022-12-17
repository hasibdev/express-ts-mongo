import express, { Request, Response } from 'express'

const router = express.Router({ mergeParams: true })

router.get('/', (req: Request, res: Response) => {
  res.send('All users')
})

export default router
