import express from 'express'

import users from './users.route'
import categories from './categories.route'
import products from './products.route'
import adminAuthController from '../../controllers/admin.auth.controller'
import { adminLoginSchema } from '../../validators/admin.auth.validator'
import { bodyValidation } from '../../middlewares/validations'

const router = express.Router()

router.post('/login', bodyValidation(adminLoginSchema), adminAuthController.login)

router.use('/users', users)
router.use('/categories', categories)
router.use('/products', products)

export default router