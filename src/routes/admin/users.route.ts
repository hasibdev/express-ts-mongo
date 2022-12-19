import express from 'express'
import usersController from '../../controllers/admin/users.controller'
import { bodyValidation, uidValidation } from '../../middlewares/validations'
import { createUserSchema } from '../../validators/user.validator'

const router = express.Router()

router
  .get('/', usersController.index)
  .post('/', bodyValidation(createUserSchema), usersController.create)
  .get('/:id', uidValidation('id'), usersController.show)
  .put('/id', uidValidation('id'), usersController.update)
  .delete('/id', uidValidation('id'), usersController.destroy)

export default router
