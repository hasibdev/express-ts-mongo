import { Request, Response } from 'express'
import Admin from "../models/Admin"
import jwt from 'jsonwebtoken'

import vars from '../config/vars'


/**
 * Login Admin
 * @route POST api/users/login
 * @return Admin with token
 */

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body


  const user = await Admin.findOne({ email })

  if (!user) return res.status(400).json({ message: 'Admin Not found!' })

  const checkPassword = await user.matchPassword(password)
  const jwtSecret = vars.jwtSecret

  if (!checkPassword) {
    return res.status(401).json({ message: 'Invalid Email or Password' })
  }

  const { password: pass, ...others } = user.toJSON()

  jwt.sign({ user }, jwtSecret, { expiresIn: '1d' }, (err: any, token: any) => {
    if (err) {
      return res.status(500).json({ message: 'Error in JWT token generation' })
    }
    return res.json({ access_token: token, data: others })
  })

}


export default { login }