import http from 'http'
import app from './config/express'
import mongoose from './config/mongoose'
import vars from './config/vars'

const server = http.createServer(app)

// open mongoose connection
mongoose.connect()

server.on('listening', async function () {
  console.log(`Application running on http://localhost:${vars.port}`)
})
const listen = server.listen(vars.port)

process.on('unhandledRejection', (reason, promise) => {
  console.log('Logged Error: ', reason)
  listen.close(() => process.exit(1))
})
