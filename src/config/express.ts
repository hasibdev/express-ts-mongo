import morgan from 'morgan'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from '../routes'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpecs } from './swagger'
import vars from './vars'
import { expressSession } from './session'

const app = express()

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan(vars.logs))
  .use(helmet())
  .use(cors())
  .use(expressSession)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
  .use('/api', routes)

export default app