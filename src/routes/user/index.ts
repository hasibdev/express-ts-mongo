import express from 'express'
import { bodyValidation } from '../../middlewares/validations'
import { userLoginSchema, userSignupSchema } from '../../validators/user.validator'
import userAuthController from '../../controllers/user.auth.controller'

const router = express.Router()


router.post('/login', bodyValidation(userLoginSchema), userAuthController.login)
router.post('/signup', bodyValidation(userSignupSchema), userAuthController.signup)

export default router