import { Request, Response } from 'express'
import Admin from "../models/Admin"
import jwt from 'jsonwebtoken'
import vars from '../config/vars'

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
  res.cookie('adminjwt', refreshToken, {
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

/**
 * Refresh token
 * @route POST api/user/refresh-token
 * @access Public
 * @return jwt token
 */
const generateRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies
  console.log(cookies)

  if (!cookies?.adminjwt) {
    return res.status(401).json({ message: 'No Cookies' })
  }

  const token = cookies.adminjwt

  jwt.verify(token, vars.refreshTokenSecret, async (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Jwt varify fail' })
    }

    const user = await Admin.findById(decoded.id)

    if (!user) {
      return res.status(401).json({ message: 'No User found' })
    }

    return res.json({
      access_token: user.getAccessToken(),
    })

  })

}

/**
 * Logout
 * @route POST api/user/logout
 * @access Public
 * @return Deleted
 */
const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies
  if (!cookies?.adminjwt) {
    return res.status(204).json({ message: 'No Content' })
  }

  res.clearCookie('adminjwt', { httpOnly: true, sameSite: 'none', secure: true })
  return res.json({ message: 'Cleared cookies' })
}

export default { login, logout, generateRefreshToken }