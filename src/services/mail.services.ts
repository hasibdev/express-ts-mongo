import transporter from "../config/nodemailer"
import vars from "../config/vars"


interface EmailVarificationOptions {
  to: string
  subject: string
  text: string
  html: any
}
export const sendEmailVarification = async ({ to, subject, text, html }: EmailVarificationOptions) => {
  const from = `"${vars.emailConfig.senderName}" <${vars.emailConfig.username}>`

  try {
    const info = await transporter.sendMail({ from, to, subject, text, html })
    console.log('mail send success')

    return Promise.resolve(info)
  } catch (error) {
    console.log(error)
    return Promise.reject(error)
  }

}