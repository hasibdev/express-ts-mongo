import { Request, Response } from 'express'
import Admin from "../models/Admin"

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
  if (!checkPassword) {
    return res.status(401).json({ message: 'Invalid Email or Password' })
  }

  const { password: pass, ...others } = user.toJSON()
  return res.status(201).json({
    access_token: user.getsignedToken(),
    data: others
  })
}


export default { login }