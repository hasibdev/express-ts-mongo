import { NextFunction, Request, Response } from 'express'
import { HydratedDocument } from 'mongoose'
import jwt from 'jsonwebtoken'
import vars from '../config/vars'
import Admin, { AdminType } from '../models/Admin'
import User, { UserType } from '../models/User'

type Guards = 'admins' | 'users'
const guardsModel = {
  admins: Admin,
  users: User
}

export default function (...args: Guards[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const guards = [...args]
    const authHeader = req.headers['authorization']

    if (!authHeader) return res.status(401).json({ message: 'You are not authenticated!' })

    let token = authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : authHeader
    if (!token) return res.status(401).json({ message: 'You are not allowed!' })

    jwt.verify(token, vars.jwtSecret, async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token!' })
      }

      const guard: Guards = decoded.guard

      if (guards.length && !guards.includes(guard)) {
        return res.status(403).json({ message: 'You are not allowed!' })
      }

      const user: UserType | AdminType | null = await User.findById(decoded.id)

      if (!user) {
        return res.status(401).json({ message: 'User not found with this token!' })
      }

      req.user = user

      next()
    })
  }
}