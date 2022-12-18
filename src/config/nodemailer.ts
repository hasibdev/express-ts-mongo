import nodemailer from 'nodemailer'
import vars from './vars'

const transporter = nodemailer.createTransport({
  host: vars.emailConfig.host,
  port: vars.emailConfig.port,
  auth: {
    user: vars.emailConfig.username,
    pass: vars.emailConfig.password
  }
})


//  verify connection configuration
transporter.verify(function (error) {
  if (error) console.log('Nodemailer Error: ', error)
  else console.log("Server is ready to send your mail")
})

export default transporter