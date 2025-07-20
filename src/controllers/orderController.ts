 import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetails from "../database/models/orderDetail";
import Payment from "../database/models/paymentModel";
import { PaymentMethod, PaymentStatus } from "../globals/types";
import axios from "axios";

interface IProduct{
  productId :string,
  productQty: string
}

interface OrderRequest extends Request {
  user? :{
    id: string
  }
  }

  
class OrderController{
  static async createOrder(req:OrderRequest,res:Response):Promise<void>{
    const userId= req.user?.id
   const {phoneNumber,shippingAddress,totalAmount,paymentMethod}=req.body
   const products:IProduct[] =req.body.products
   if(!phoneNumber||!shippingAddress ||!totalAmount || products.length==0){
    res.status(400).json({
      message: "Please provide all required fields"
    })
    return
   
  }
  //for order
  const orderData = await Order.create({
    phoneNumber,
    address:shippingAddress,
    totalAmount,
    userId: userId
  })
  //for orderDetails
  
  products.forEach(function(Product){
   OrderDetails.create({
  quantity : Product.productQty,
  productId : Product.productId,
  OrderId: orderData.id
})


  })
  const paymentData =  await Payment.create({
      orderId : orderData.id,
      paymentMethod : paymentMethod,
    })
  
  if(paymentMethod==PaymentMethod.COD){
  
  }
   if(paymentMethod ==  PaymentMethod.khalti){
    const data ={
      return_url : "https://localhost:5173/",
      website_url : "http://localhost:5173/",
      amount : totalAmount *100, //khalti ma amount in paisa
      purchase_order_id : orderData.id,
      purchase_order_name : "order_"+ orderData.id
    }
  const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",data,{
    headers:{
     Authorization:"key 0048e967d69e4db5be2f0dbc9d908f77"
} 
  
  })
 const khaltiResponse = response.data
 paymentData.pidx = khaltiResponse.pidx
 paymentData.save()
  res.status(200).json({
    message: "Order created successfully",
    url: khaltiResponse.payment_url,
    pidx : khaltiResponse.pidx
  })
}else if(paymentMethod == PaymentMethod.Esewa){
}
else{
  res.status(200).json({
    message: "order created sucessfully"
  })
  }
 
}

 static async verifyTransaction(req:OrderRequest,res:Response):Promise<void>{
 const {pidx} = req.body
 if(!pidx){
   res.status(400).json({
    message : "please provide pidx"

   })
   return
 }
  const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/",{
  pidx: pidx},{
  headers:{
    Authorization:"key 0048e967d69e4db5be2f0dbc9d908f77"
  }
 })
const data = response.data
if(data.status === "Completed"){
 await Payment.update({PaymentStatus:PaymentStatus.paid},{
  where: { pidx: pidx }
})
  res.status(200).json({
    message: "Payment verified successful",
    
  })
}else{
  res.status(400).json({
    message: "Payment verification failed",
    
  })
}
}



}


export default  OrderController