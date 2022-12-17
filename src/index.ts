import http from 'http'

import app from './config/express'
import mongoose from './config/mongoose'
import vars from './config/vars'

// Server Running
const server = http.createServer(app)

// open mongoose connection
mongoose.connect()

server.on('listening', async function () {
  console.log(`Application running on http://localhost:${vars.port}`)
})
server.listen(vars.port)
