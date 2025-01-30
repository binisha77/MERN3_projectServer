import { Request,Response} from "express";
import User from "../database/models/UserModel";
import bcrypt from 'bcrypt'

class UserController{
  static async register(req:Request, res:Response){


const {username,email,password} = req.body
if(!username || !email || !password){
  res.status(400).json({
message : "please provide username,email,password"
  })
  return
}

await User.create({

username,
email,
password: bcrypt.hashSync(password,14),
})




res.status(201).json({

message : "user registered sucessfully"
})

}
}