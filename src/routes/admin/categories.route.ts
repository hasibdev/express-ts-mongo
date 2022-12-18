import express from 'express'
import { bodyValidation, uidValidation } from '../../middlewares/validations'
import categoriesController from '../../controllers/admin/categories.controller'
import { createCategorySchema } from '../../validators/categories.validator'

const router = express.Router()

router.get('/', categoriesController.index)
router.post('/', bodyValidation(createCategorySchema), categoriesController.create)
router.get('/:id', uidValidation('id'), categoriesController.show)
router.put('/id', uidValidation('id'), categoriesController.update)
router.delete('/id', uidValidation('id'), categoriesController.destroy)


export default router
