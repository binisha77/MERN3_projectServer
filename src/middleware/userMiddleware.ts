import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { envConfig } from "../config/config";
import User from "../database/models/UserModel";

export enum Role{
  Admin = 'admin',
  Customer = "customer"
}

interface IExtendedRequest  extends Request {
 user? :{
  username :string,
  email :string,
  role :string, //naya type banako 
  password:string,
  id:string
 }
}

class UserMiddlerare{
  async isUserLoggedIn(req:IExtendedRequest,res:Response,next:NextFunction):Promise<void>{
  const token = req.headers.authorization
  if(!token){
    res.status(403).json({
      message :"Token must be provided"
    })
    return
  }
  jwt.verify(token,envConfig.jwtSecretKey as string, async (err,result:any)=>{
if(err){
  res.status(403).json({
    message :"Invalid token !!!"
  })
}else{
  
  const userData = await User.findByPk(result.userId)//{email:"",password:"",role:""}
 if(!userData){
  res.status(404).json({
    message :"No user with that userId"
  })
  return
 }
 req.user = userData //req is  object 
  next()
}
  })
  }
  accessTo(...roles:Role[]){
    return (req:IExtendedRequest,res:Response,next:NextFunction)=>{
      let userRole = req.user?.role as Role
      console.log(userRole,"Role")
      if(!roles.includes(userRole)){
        res.status(403).json({
          message :"You are not authorized to access this resource"
        })
        return//return lakaya paxi else hanu pardina
      }
      next()
    }

  }
}

export default new UserMiddlerare