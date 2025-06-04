import { Request,Response} from "express";
import User from "../database/models/UserModel";
import bcrypt from 'bcrypt'
import generateToken from "../services/generateToken";



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
}

export default UserController