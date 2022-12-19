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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan(vars.logs))
app.use(helmet())

app.use(cors())
app.use(expressSession)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use('/api', routes)

export default app