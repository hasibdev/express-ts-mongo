import morgan from 'morgan'
import fs from 'fs'
import path from 'path'
import vars from './vars'

const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', '..', 'logs', 'access.log'), { flags: 'a' })

export default morgan(vars.logs, { stream: accessLogStream })