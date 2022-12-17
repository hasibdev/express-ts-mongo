import { Request, Response } from 'express'
import User from "../models/User"
import paginated from "../utils/pagination"


/**
 * Get List of Data
 * @route GET api/users
 */
const index = async (req: Request, res: Response) => {
  try {
    const { limit, skip, meta } = await paginated(User, req)

    const data = await User.find().limit(limit).skip(skip).select(['-password'])
    res.json({ data, meta })
  } catch (error) {
    res.status(500).json({ error })
  }
}

/**
 * Get single Data
 * @route GET api/users/:id
 */
const show = async (req: Request, res: Response) => {
  try {
    const data = await User.findById(req.params.id).select('-password')
    if (!data) {
      return res.status(404).json({ message: 'User not found!' })
    }
    res.json({ data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

/**
 * Create new Data
 * @route POST api/users
 */
const create = async (req: Request, res: Response) => {

  const { firstName, lastName, email, password, phone } = req.body
  try {
    const user = await User.create({ firstName, lastName, email, password, phone })
    const data = await User.findById(user.id).select('-password')
    res.json({ user: data })
  } catch (error) {
    res.status(500).json({ error })
  }
}

/**
 * Update Data
 * @route PUT api/users/:id
 */
const update = async (req: Request, res: Response) => {

  const { firstName, lastName, email, phone } = req.body
  const { id } = req.params
  try {
    const data = await User.findByIdAndUpdate(id, { firstName, lastName, email, phone })

    if (!data) {
      return res.status(404).json({ message: 'User not found!' })
    }

    res.json({ data: await User.findById(id) })
  } catch (error) {
    res.status(500).json({ error })
  }
}

/**
 * Delete Data
 * @route DELETE api/users/:id
 */
const destroy = async (req: Request, res: Response) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id)

    if (!data) {
      return res.status(404).json({ message: 'User not found!' })
    }

    res.json({ message: 'Deleted Successfully!' })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default { index, show, create, update, destroy }