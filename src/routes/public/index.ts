import express, { Request, Response } from 'express'


const router = express.Router()

router.get('/', (req: any, res: Response) => {
  req.session.isAuth = '123456'
  console.log(req.session)
  console.log(req.session.id)

  return res.send('Hello world')
})

export default router