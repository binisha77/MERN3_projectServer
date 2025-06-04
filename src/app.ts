import express from 'express';
import './database/connection';

import userRoute from './routes/userRoute';
import cors from 'cors'; 

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

app.use("/api/auth", userRoute);

export default app;
