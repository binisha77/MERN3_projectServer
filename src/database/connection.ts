import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config"
import User from "./models/UserModel";
import Category from "./models/categoryModel";
import Product from "./models/productModel";
import Order from "./models/orderModel";
import Payment from "./models/paymentModel";
import OrderDetails from "./models/orderDetail";





const sequelize=new Sequelize(envConfig.connectionString as string,{
   models: [__dirname + '/models'], // ✅ register model here
 
})

try{
  sequelize.authenticate()
  .then(()=>{
console.log("milyo hai authentication!!")
  })

  .catch(err=>{
    console.log("error aayo",err)
  })

}
catch (error){
console.log(error)
}
sequelize.sync({force : false,alter:false}).then(()=>{
  console.log("synced !!")
})


//relationship //
Category.hasOne(Product,{foreignKey: 'categoryId'})
Product.belongsTo(Category,{foreignKey: 'categoryId'})


User.hasMany(Order,{foreignKey: 'UserId'})
Order.belongsTo(User,{foreignKey: 'UserId'})

//payment
Order.hasOne(Payment,{foreignKey:'OrderId'}) 
Payment.belongsTo(Order,{foreignKey:'OrderId'})

Order.hasOne(OrderDetails,{foreignKey: 'OrderId'})
OrderDetails.belongsTo(Order,{foreignKey: 'OrderId'})

Product.hasMany(OrderDetails,{foreignKey: 'ProductId'})
OrderDetails.belongsTo(Product,{foreignKey: 'ProductId'})

export default sequelize