import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import helmet from 'helmet'
import cookieParser from 'cookie-parser';
import rateLimiter from 'express-rate-limit';
import connection from './Connection/mongoConnection.js';
import authrouter from './Routers/authRoutes.js';
import studentRoute from './Routers/studentRoute.js';
import paymentRoute from './Routers/paymentRoute.js';
import courseRoute from './Routers/courseRoute.js';


const app=express();
env.config();


app.use(express.json({limit:"50mb"}));
app.use(cors({
 origin:"http://localhost:5173" || "*",
 methods:['GET','POST','PUT','DELETE'],
 credentials:true
}));
app.use(cookieParser())
app.use(helmet());
const limiter=rateLimiter({
  windowMs:15 * 60 * 1000,
  max:10000,
  message:"Too many requests try again later"
})
app.use(limiter)
app.use(`/api`,authrouter,studentRoute,paymentRoute,courseRoute)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});


connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`http://localhost:${process.env.PORT}`);
        
    })
}).catch((error)=>{
   console.log(`Error in server integration`,error);
   
})