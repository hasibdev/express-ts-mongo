import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'
import vars from './vars'

const MongoDBSession = ConnectMongoDBSession(session)

const sessionStore = new MongoDBSession({
  uri: vars.mongo.uri,
  collection: 'mySessions'
})
// Catch errors
sessionStore.on('error', function (error) {
  console.log(error)
})

export const expressSession = session({
  secret: 'session-secret',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
})

