import { Request, Response } from 'express'
import User from "../models/User"

/**
 * Login User
 * @route POST api/user/login
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

  const { password: pass, ...others } = user.toJSON()
  return res.json({
    access_token: user.getsignedToken(),
    data: others
  })

}
/**
 * Create new Data
 * @route POST api/user/signup
 * @return User with token
 */
const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, phone } = req.body
  try {
    const user = await User.create({ firstName, lastName, email, password, phone })
    const { password: pass, ...others } = user.toJSON()

    return res.status(201).json({
      access_token: user.getsignedToken(),
      data: others
    })

  } catch (error) {
    return res.status(500).json({ error })
  }
}

/**
 * Veriry Email
 * @route POST api/user/verify-email
 * @return User with token
 */
const verifyEmail = async (req: Request, res: Response) => {
  return res.send('Hello')
}

export default { login, signup, verifyEmail }