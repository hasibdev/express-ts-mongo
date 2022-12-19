import { HydratedDocument } from 'mongoose'

import { UserModel } from "../../src/models/User"
import { AdminModel } from "../../src/models/Admin"

declare global {
  namespace Express {
    interface Request {
      user?: UserModel | AdminModel
    }
  }
}