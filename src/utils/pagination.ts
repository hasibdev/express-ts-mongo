import { Request } from 'express'
export default async function (Model: any, req: Request, { defaultPage = 1, defaultLimit = 25 } = {}) {
   try {
      const { page, perPage } = req.query

      const count = await Model.count()
      const currentPage = page ? Number.parseInt(page as string) : defaultPage
      const limit = perPage ? Number.parseInt(perPage as string) : defaultLimit

      const totalPage = Math.ceil(count / limit)
      const skip = (currentPage - 1) * limit

      const nextPage = currentPage >= totalPage ? null : (currentPage + 1)
      const prevPage = (currentPage - 1) || null

      const meta = {
         count,
         totalPage,
         currentPage,
         nextPage,
         prevPage,
      }

      return Promise.resolve({ meta, limit, skip })
   } catch (error) {
      return Promise.reject(error)
   }
}