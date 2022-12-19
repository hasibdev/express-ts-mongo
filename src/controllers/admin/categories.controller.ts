import { Request, Response } from 'express'
import Category from "../../models/Category"
import paginated from "../../utils/pagination"

/**
 * Get List of Data
 * @route GET api/users
 * @return Category[]
 */
const index = async (req: Request, res: Response) => {
  try {
    const { limit, skip, meta } = await paginated(Category, req)

    const data = await Category.find().limit(limit).skip(skip)
    return res.json({ data, meta })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

/**
 * Get single Data
 * @route GET api/users/:id
 */
const show = async (req: Request, res: Response) => {
  try {
    const data = await Category.findById(req.params.id)
    if (!data) {
      return res.status(404).json({ message: 'Category not found!' })
    }
    return res.json({ data })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

/**
 * Create new Data
 * @route POST api/users
 * @return Category with token
 */
const create = async (req: Request, res: Response) => {

  const { name, description } = req.body
  try {
    const data = await Category.create({ name, description })

    return res.status(201).json({ data })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

/**
 * Update Data
 * @route PUT api/users/:id
 * @return Category
 */
const update = async (req: Request, res: Response) => {

  const { name, description } = req.body
  const { id } = req.params
  try {
    const data = await Category.findByIdAndUpdate(id, { name, description })

    if (!data) {
      return res.status(404).json({ message: 'Category not found!' })
    }

    return res.json({ data: await Category.findById(id) })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

/**
 * Delete Data
 * @route DELETE api/users/:id
 * @return null
 */
const destroy = async (req: Request, res: Response) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id)

    if (!data) {
      return res.status(404).json({ message: 'Category not found!' })
    }

    return res.json({ message: 'Deleted Successfully!' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default { index, show, create, update, destroy }