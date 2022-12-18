import express from 'express'

import users from './users.route'
import categories from './categories.route'
import products from './products.route'

const router = express.Router()

router.use('/users', users)
router.use('/categories', categories)
router.use('/products', products)

export default router