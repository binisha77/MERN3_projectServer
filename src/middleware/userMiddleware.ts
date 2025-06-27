import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { envConfig } from "../config/config";
import User from "../database/models/UserModel";

enum Role{
  Admin = 'admin',
  Customer = "customer"
}

class UserMiddlerare{
  async isUserLoggedIn(req:Request,res:Response,next:NextFunction):Promise<void>{
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
  console.log(result)
  const userData = await User.findByPk(result.userId)
  //@ts-ignore
  req.user = userId
  next()
}
  })
  }
  restrictTo(...roles:Role[]){
    return (req:Request,res:Response,next:NextFunction)=>{

    }

  }
}

export default new UserMiddlerare