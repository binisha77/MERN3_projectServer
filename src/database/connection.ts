import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config"
import User from "./models/UserModel";
import Category from "./models/categoryModel";
import Product from "./models/productModel";





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
sequelize.sync({force : false,alter:true}).then(()=>{
  console.log("synced !!")
})

//relationship //
Product.belongsTo(Category,{foreignKey: 'categoryId'})
Category.hasOne(Product,{foreignKey: 'categoryId'})


export default sequelize