
import express from 'express'
import helmet from 'helmet'
import cors from './cors'
import routes from '../routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpecs } from './swagger'
import { expressSession } from './session'
import path from 'path'
import { notFound } from '../controllers/http/http.controller'
import morgan from './morgan'

const app = express()

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan)
  .use(cors)
  .use(expressSession)
  .use(helmet())
  .use('/', express.static(path.join(__dirname, 'public')))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
  .use('/api', routes)
  .all('*', notFound)

export default app