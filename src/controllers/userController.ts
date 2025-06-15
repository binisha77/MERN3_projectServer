import { Request,Response} from "express";
import User from "../database/models/UserModel";
import bcrypt from 'bcrypt'
import generateToken from "../services/generateToken";
import generateOtp from "../services/generateOtp";
import sendMail from "../services/sendMail";



class UserController{
  static async register(req:Request, res:Response){


const {username,email,password} = req.body;
if(!username || !email || !password){
  res.status(400).json({
message : "please provide username,email,password"
  })
  return
}

const user = await User.create({
username,
email,
password: bcrypt.hashSync(password,14),
})

await sendMail({
  to : email,
  subject :"Registration successfull on digital Dokaan",
  text : "welcome to digital dokaan, Thank you for registering"
})


res.status(201).json({

message : "user registered sucessfully",
data : user
})

  }
static async login(req:Request,res:Response){
  const {email, password} = req.body
  if(!email || ! password){
    res.status(400).json({
      message :"please provide email,password"
    })
    return
  }
   const [user] = await User.findAll({
    where : {
      email : email,
    }
   })
   

   if(!user){
    res.status(404).json({
      message : "No user with that email😓"
    })
   }else{
    const isEqual = bcrypt.compareSync(password,user.password)
    if(!isEqual){
      res.status(400).json({
        message : "Invalid password"
      })
    }else{

      const token = generateToken(user.id)
      res.status(200).json({
        message :"logged in sucess",
        token
      })
    }
   }
}
static async handleForgotPassword(req:Request,res:Response){
const {email} =req.body
if(!email){
  res.status(400).json({message : "please provide email"})
return }
const [user] = await User.findAll({
  where :{
    email : email
  }
  
})
if(!user){
   res.status(404).json({
    email: "Email not registered"
  })
  return
}
const otp = generateOtp()
 await sendMail({
  to: email,
  subject:"Digital Dokaan password change",
  text :`you just request to reset password.here is your otp,${otp}`
})
user.otp = otp.toString()
user.otpGeneratedTime = Date.now().toString()
await user.save()
res.status(200).json({
  message : "password Reset OTP sucessfully"

})
}
}

export default UserController