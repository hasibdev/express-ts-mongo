import { Request, Response } from 'express'
import Admin from "../models/Admin"

/**
 * Login Admin
 * @route POST api/admin/login
 * @access Public
 * @return Admin with token
 */

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await Admin.findOne({ email }).select('+password')

  if (!user) return res.status(400).json({ message: 'Admin Not found!' })

  const checkPassword = await user.matchPassword(password)
  if (!checkPassword) {
    return res.status(401).json({ message: 'Invalid Email or Password' })
  }

  const refreshToken = user.getRefreshToken()
  res.cookie('userjwt', refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  const { password: pass, ...others } = user.toJSON()
  return res.status(201).json({
    access_token: user.getAccessToken(),
    data: others
  })
}


export default { login }