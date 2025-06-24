import express from 'express';
import './database/connection';

import userRoute from './routes/userRoute';
import User from './database/models/UserModel';
import cors from 'cors'; 

const app = express();

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

export default app;
