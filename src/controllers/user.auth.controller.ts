import { Request, Response } from 'express'
import User from "../models/User"
import jwt from 'jsonwebtoken'
import vars from '../config/vars'

/**
 * Login User
 * @route POST api/user/login
 * @access Public
 * @return User with token
 */

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user) return res.status(400).json({ message: 'User Not found!' })

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
  return res.json({
    access_token: user.getAccessToken(),
    data: others
  })

}
/**
 * Create new Data
 * @route POST api/user/signup
 * @access Public
 * @return User with token
 */
const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phone } = req.body
  try {
    const user = await User.create({ firstName, lastName, email, password, phone })
    const { password: pass, ...others } = user.toJSON()

    const refreshToken = user.getRefreshToken()
    res.cookie('userjwt', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
      access_token: user.getAccessToken(),
      data: others
    })

  } catch (error) {
    return res.status(500).json({ error })
  }
}

/**
 * Veriry Email
 * @route POST api/user/verify-email
 * @access Public
 * @return User with token
 */
const verifyEmail = async (req: Request, res: Response) => {
  return res.send('Hello')
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

  if (!cookies?.userjwt) {
    return res.status(401).json({ message: 'No Cookies' })
  }

  const token = cookies.userjwt

  jwt.verify(token, vars.refreshTokenSecret, async (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Jwt varify fail' })
    }

    const user = await User.findById(decoded.id)

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
  if (!cookies?.userjwt) {
    return res.status(204).json({ message: 'No Content' })
  }

  res.clearCookie('userjwt', { httpOnly: true, sameSite: 'none', secure: true })
  return res.json({ message: 'Cleared cookies' })
}

export default { login, signup, verifyEmail, generateRefreshToken, logout }