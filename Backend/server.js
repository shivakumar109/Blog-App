import exp from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { userRoute } from './APIs/user_api.js'
import { authorRoute } from './APIs/auther_api.js'
import { adminRoute } from './APIs/admin_api.js'
import { commonRoute } from './APIs/common_api.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config() //process.env
//create express application
const  app=exp()
//use cors middleware
app.use(cors({ origin:["http://localhost:5173" ,"https://blog-app-ym51.onrender.com"],credentials:true}));
//add body parser middleware
app.use(exp.json());
//add c
app.use(cookieParser());
//connect APIS
app.use('/user-api', userRoute);
app.use('/author-api', authorRoute);
app.use('/admin-api', adminRoute);
app.use('/common-api',commonRoute);

//connect to db
const connectDb=async()=>{
     try{
     await connect(process.env.ATLAS_URL);
     console.log("DB connection successful");
     app.listen(process.env.PORT,()=>console.log("server 4000 started"));
     }catch(err){
          console.log('Error in DB Connection ',err);
     }
}
connectDb();

//dealing with invalid path
app.use((req,res,next)=>{
     //console.log(req.url)
     res.json({message: `${req.url} is invalid path`});
})

//error handling middle ware
app.use((err, req, res, next) => {

  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Full error:", err);

  // mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // mongoose cast error
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message,
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`
    });
  }
  //  HANDLE CUSTOM ERRORS
  if (err.status) {
    return res.status(err.status).json({
      message: "error occurred",
      error: err.message,
    });
  }

  // default server error
  res.status(500).json({
    message: "error occurred",
    error: "Server side error",
  });
});