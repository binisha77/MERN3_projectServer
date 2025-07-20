



import{Table,Column,Model,DataType, PrimaryKey} from 'sequelize-typescript';
import { PaymentMethod, PaymentStatus } from '../../globals/types';


@Table({
  tableName: "payment",
  modelName :"payment",
  timestamps : true
})


class Payment extends Model{
@Column({

  primaryKey: true,
  type : DataType.UUID,
  defaultValue : DataType.UUIDV4
})
declare id : string
@Column({
  type : DataType.ENUM(PaymentMethod.COD,PaymentMethod.Esewa,PaymentMethod.khalti),
  defaultValue:PaymentMethod.COD
})
declare paymentMethod : string
@Column({
  type :DataType.ENUM(PaymentStatus.paid,PaymentStatus.unpaid),
  defaultValue:PaymentStatus.unpaid
})

declare paymentStatus : string

@Column({
  type : DataType.STRING
})
declare pidx: string
}


export default Payment;