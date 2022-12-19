import express from 'express'
import { bodyValidation, uidValidation } from '../../middlewares/validations'
import categoriesController from '../../controllers/admin/categories.controller'
import { createCategorySchema } from '../../validators/categories.validator'

const router = express.Router()

router
  .get('/', categoriesController.index)
  .post('/', bodyValidation(createCategorySchema), categoriesController.create)
  .get('/:id', uidValidation('id'), categoriesController.show)
  .put('/id', uidValidation('id'), categoriesController.update)
  .delete('/id', uidValidation('id'), categoriesController.destroy)


export default router
