import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config"
import User from "./models/UserModel";





const sequelize=new Sequelize(envConfig.connectionString as string,{
   models: [User], // ✅ register model here
  logging: false,
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
export default sequelize