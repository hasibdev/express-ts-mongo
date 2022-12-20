import morgan from 'morgan'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from '../routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpecs } from './swagger'
import vars from './vars'
import { expressSession } from './session'
import path from 'path'
import { notFound } from '../controllers/http/http.controller'

const app = express()

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan(vars.logs))
  .use(helmet())
  .use(cors())
  .use(expressSession)
  .use('/', express.static(path.join(__dirname, '/public')))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
  .use('/api', routes)
  .all('*', notFound)

export default app