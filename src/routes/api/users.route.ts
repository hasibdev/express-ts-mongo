import express from 'express'
import usersController from '../../controllers/users.controller'
import { bodyValidation, uidValidation } from '../../middlewares/validations'
import { createUserSchema } from '../../validators/user.validator'

const router = express.Router({ mergeParams: true })

router.get('/', usersController.index)
router.post('/', bodyValidation(createUserSchema), usersController.create)
router.get('/:id', uidValidation('id'), usersController.show)
router.put('/id', uidValidation('id'), usersController.update)
router.delete('/id', uidValidation('id'), usersController.destroy)

export default router
