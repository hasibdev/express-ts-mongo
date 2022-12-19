import express from 'express'

import users from './users.route'
import categories from './categories.route'
import products from './products.route'
import adminAuthController from '../../controllers/admin.auth.controller'
import { adminLoginSchema } from '../../validators/admin.auth.validator'
import { bodyValidation } from '../../middlewares/validations'
import auth from '../../middlewares/auth'

const router = express.Router()

router
  .post('/login', bodyValidation(adminLoginSchema), adminAuthController.login)
  .use('/users', auth('admins'), users)
  .use('/categories', auth('admins'), categories)
  .use('/products', auth('admins'), products)

export default router