import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config"
import User from "./models/UserModel";





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
export default sequelize