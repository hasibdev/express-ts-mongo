import express from 'express'
import usersController from '../../controllers/users.controller'
import { bodyValidation } from '../../middlewares/validations'
import { createUserSchema } from '../../validators/user.validator'

const router = express.Router({ mergeParams: true })

router.get('/', usersController.index)
router.get('/:id', usersController.show)
router.post('/', bodyValidation(createUserSchema), usersController.create)
router.post('/update', usersController.update)
router.delete('/delete', usersController.destroy)

export default router
