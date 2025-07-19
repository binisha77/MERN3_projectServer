 import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetails from "../database/models/orderDetail";
import Payment from "../database/models/paymentModel";
import { PaymentMethod } from "../globals/types";


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
  console.log(orderData,"orderData!!")
  console.log(products)
  products.forEach(function(Product){
   OrderDetails.create({
  quantity : Product.productQty,
  productId : Product.productId,
  OrderId: orderData.id
})


  })
  if(paymentMethod==PaymentMethod.COD){
    await Payment.create({
      orderId : orderData.id,
      paymnetMethod : paymentMethod,
    })
  }
  else if(paymentMethod ==  PaymentMethod.khalti){
  //esewa
  }
  else{
  //khalti
  }
  res.status(200).json({
    message: "Order created successfully",
  })
}
}


export default  OrderController