import express from 'express'
import { bodyValidation } from '../../middlewares/validations'
import { userLoginSchema, userSignupSchema } from '../../validators/user.auth.validator'
import userAuthController from '../../controllers/user.auth.controller'

const router = express.Router()


router
  .post('/login', bodyValidation(userLoginSchema), userAuthController.login)
  .post('/signup', bodyValidation(userSignupSchema), userAuthController.signup)
  .get('/verify-email', userAuthController.verifyEmail)

export default router