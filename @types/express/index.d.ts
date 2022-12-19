import { HydratedDocument } from 'mongoose'

import { UserType } from "../../src/models/User"
import { AdminType } from "../../src/models/Admin"

declare global {
  namespace Express {
    interface Request {
      user?: UserType | AdminType | null
    }
  }
}