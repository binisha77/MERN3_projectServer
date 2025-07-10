




import{Table,Column,Model,DataType} from 'sequelize-typescript';
import { OrderStatus } from '../../globals/types'

@Table({
  tableName: "orders",
  modelName :"order",
  timestamps : true
})


class Order extends Model{
  @Column({
    primaryKey: true,
    type : DataType.UUID,
    defaultValue : DataType.UUIDV4
  })
  declare id : string

  @Column({
    type : DataType.STRING,
    allowNull : false,
    validate :{
      len: {
        args:[10,10],
        msg:"phone number must be 10 digits!"
      }
    }
  })
  declare phoneNumber : string

  @Column({
    type : DataType.STRING,
    allowNull:false

  })
  declare address : string
  @Column({
    type :DataType.FLOAT,
    allowNull:false
  })
declare totalAmount : number

@Column({
  type :DataType.ENUM(OrderStatus.cancelled, OrderStatus.delivered, OrderStatus.ontheway, OrderStatus.pending, OrderStatus.prepation),
   defaultValue :OrderStatus.pending
})
declare orderStatus : String
}
export default Order