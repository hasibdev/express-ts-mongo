import express from 'express'
import users from './api/users.route'
import categories from './api/categories.route'
import products from './api/products.route'

const router = express.Router()

router.use('/users', users)
router.use('/categories', categories)
router.use('/products', products)

export default router