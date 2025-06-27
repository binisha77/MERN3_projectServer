import  jwt from "jsonwebtoken"
import { envConfig } from "../config/config"



const generateToken =(userId : string) =>{
const token = jwt.sign({userId : userId},envConfig.jwtSecretKey as string,{
   expiresIn :'20d'
    // envConfig.jwtExpiresIn
})
return token
}


export default generateToken


