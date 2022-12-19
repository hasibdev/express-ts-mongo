import { Request, Response } from 'express'
import User from "../models/User"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

import vars from '../config/vars'
import { sendEmailVarification } from '../services/mail.services'


/**
 * Login User
 * @route POST api/users/login
 * @return User with token
 */

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body


  const user = await User.findOne({ email }).select('+password')

  if (!user) return res.status(400).json({ message: 'User Not found!' })

  const checkPassword = await bcrypt.compare(password, user.password)
  const jwtSecret = vars.jwtSecret

  if (!checkPassword) {
    return res.status(401).json({ message: 'Invalid Email or Password' })
  }

  const { password: pass, ...others } = user.toJSON()

  jwt.sign({ user: user.id }, jwtSecret, { expiresIn: '1d' }, async (err: any, token: any) => {
    if (err) {
      return res.status(500).json({ message: 'Error in JWT token generation' })
    }

    return res.json({ access_token: token, data: others })
  })

}
/**
 * Create new Data
 * @route POST api/users
 * @return User with token
 */
const signup = async (req: Request, res: Response) => {

  const { firstName, lastName, email, password, phone } = req.body
  try {
    const user = await User.create({ firstName, lastName, email, password, phone })
    const { password: pass, ...others } = user.toJSON()

    const jwtSecret = vars.jwtSecret
    jwt.sign({ user: user.id }, jwtSecret, { expiresIn: '1d' }, (err: any, token: any) => {
      if (err) {
        return res.status(500).json({ message: 'Error in JWT token generation' })
      }


      sendEmailVarification({ to: user.email, token })

      return res.status(201).json({ access_token: token, data: others })
    })

  } catch (error) {
    return res.status(500).json({ error })
  }
}

const verifyEmail = async (req: Request, res: Response) => {
  return res.send('Hello')
}

export default { login, signup, verifyEmail }