import Admin from '../models/Admin'
import readline from 'readline'

import mongoose from '../config/mongoose'
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })


const validateEmail = (email: string) => {
   return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   )
}

rl.question('First Name: ', (firstName: string) => {
   rl.question('Last Name: ', (lastName: string) => {
      rl.question('Email: ', (email: string) => {
         rl.question('Password: ', (password: string) => {
            rl.question('Confirm Password: ', async (confirmedPassword: string) => {
               if (password.length < 5) {
                  console.log("Password must have to be 6 character long!")
                  console.log('Operation Fail!')
                  return rl.close()
               }

               if (password !== confirmedPassword) {
                  console.log("Password Doesn't match")
                  console.log('Operation Fail!')
                  return rl.close()
               }

               if (!validateEmail(email)) {
                  console.log("Please enter a valid Email Address!")
                  console.log('Operation Fail!')
                  return rl.close()
               }

               try {
                  await mongoose.connect()
                  const user = await Admin.exists({ email })
                  if (user) {
                     console.log('User already exits!')
                     return rl.close()
                  }

                  await Admin.create({ firstName, lastName, email, password })
                  console.log("Admin Created Successfully!")
               } catch (error) {
                  console.error(error)
               } finally {
                  rl.close()
                  process.exit()
               }
            })
         })
      })
   })
})