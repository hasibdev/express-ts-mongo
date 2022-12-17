import mongoose from 'mongoose'
import vars from './vars'

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error', err)

  process.exit(-1)
})

// print mongoose logs in dev env
if (vars.env === 'development') {
  mongoose.set('debug', true)
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
const connect = async (): Promise<mongoose.Connection> => {
  try {
    mongoose.set("strictQuery", false)

    await mongoose.connect(vars.mongo.uri)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB Connection Fail: ', error)
  }

  return mongoose.connection
}

export default { connect }