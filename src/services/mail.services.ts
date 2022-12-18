import transporter from "../config/nodemailer"
import vars from "../config/vars"


interface EmailVarificationOptions {
  to: string,
  token: string
}
export const sendEmailVarification = async ({ to, token }: EmailVarificationOptions) => {
  const from = `"${vars.emailConfig.senderName}" <${vars.emailConfig.username}>`

  const url = `http://localhost:6000/api/user/verify-email?token=${token}`
  const html = `
  <div>
    <p>Please verify your email address</p>          
    <a href="${url}" target="_blank">Click Here</a>
  </div>
  `

  const text = "Please verify your email address"
  const subject = 'Email Varification'

  try {
    const info = await transporter.sendMail({ from, to, subject, text, html })
    console.log('mail send success')

    return Promise.resolve(info)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }

}