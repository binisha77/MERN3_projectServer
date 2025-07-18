import { Response } from "express"
import sendResponse from "./sendResponse"



const checkOtpExpiration = (res:Response,otpGeneratedTime:string,thresholdTime
  :number) =>{
    const currentTime = Date.now()
    if(currentTime - parseInt(otpGeneratedTime ) <= thresholdTime){
       sendResponse(res,200,"valid OTP, now you can proceed to reset password")
     }else{
      sendResponse(res,403,"OTP expired,Sorry try again later!!")
     }
  }

  export default checkOtpExpiration