import express from 'express'
import adminRoutes from './admin'
import userRoutes from './user'
import publicRoutes from './public'

const router = express.Router()

router.use('/', publicRoutes)
  .use('/admin', adminRoutes)
  .use('/user', userRoutes)
export default router