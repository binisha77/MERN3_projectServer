import express from 'express';
import './database/connection';

import userRoute from './routes/userRoute';
import categoryRoute from './routes/categoryRoute'
import productRouter from './routes/productRoute';
import User from './database/models/UserModel';
import cors from 'cors'; 

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*"
 }));
// const app = express();
// app.use(express.json());
// const schedule = require('node-schedule');

// const job = schedule.scheduleJob('*/5 * * * *',async function(){
//   await User.findAll()
// });
app.use("/api/auth", userRoute);
app.use("/api/category",categoryRoute)
app.use("/api/product", productRouter);
export default app;
