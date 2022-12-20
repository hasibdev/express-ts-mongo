import express from 'express'
import { bodyValidation } from '../../middlewares/validations'
import { userLoginSchema, userSignupSchema } from '../../validators/user.auth.validator'
import userAuthController from '../../controllers/user.auth.controller'
// import auth from '../../middlewares/auth'

const router = express.Router()


router
  .post('/login', bodyValidation(userLoginSchema), userAuthController.login)
  .post('/signup', bodyValidation(userSignupSchema), userAuthController.signup)
  .post('/logout', userAuthController.logout)
  .get('/verify-email', userAuthController.verifyEmail)
  .get('/refresh-token', userAuthController.generateRefreshToken)

export default router