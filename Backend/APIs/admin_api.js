import exp from 'express'
import { UserTypeModel } from '../Models/user_model.js';
import { verifyToken } from '../Middlewares/verify_token.js';
export const adminRoute=exp.Router();

//read all artical(optional)
//block user 
adminRoute.put('/blockuser/:userId',verifyToken("ADMIN"),async(req,res)=>{
     //get userid
     let userId= req.params.userId;
     console.log(userId)
     //chek user
     let userObj= await UserTypeModel.findById(userId);
     if(!userObj){
          res.status(400).json({message:"user not found"})
     }
     //chek ActiveStatus of user
     let isActive= userObj.isActive;
     //if active make inactive
     if(isActive){
          await UserTypeModel.findByIdAndUpdate(userId,{isActive:false});
          res.status(200).json({message:"updated to in active"})
     }
     else{
          res.status(200).json({message:"User already blocked"})
     }
})
//unblock user
adminRoute.put('/unblockuser/:userId',verifyToken("ADMIN"),async(req,res)=>{
     //get userid
     let userId= req.params.userId;
     //chek user
     let userObj= await UserTypeModel.findById(userId);
     if(!userObj){
          res.status(400).json({message:"user not found"})
     }
     //chek ActiveStatus of user
     let isActive= userObj.isActive;
     //if inactive make active
     if(!isActive){
          await UserTypeModel.findByIdAndUpdate(userId,{isActive:true});
          res.status(200).json({message:"updated to active"})
     }
     else{
          res.status(200).json({message:"user is already in active state"})
     }
})
