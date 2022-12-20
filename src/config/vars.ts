import dotenv from "dotenv"
dotenv.config()

const mongoURL = process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'abcd123456efg78910',
  refreshTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'dfgh123456efg78910',

  mongo: {
    uri: mongoURL || '',
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    senderName: process.env.EMAIL_SENDER_NAME || "",
    host: process.env.EMAIL_HOST || "",
    port: parseInt(process.env.EMAIL_PORT || ''),
    username: process.env.EMAIL_USERNAME || "",
    password: process.env.EMAIL_PASSWORD || "",
  },
}