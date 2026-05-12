import exp from "express";
import bcrypt from "bcryptjs";
import { authenticate } from "../Services/auth_service.js";
import { UserTypeModel } from "../Models/user_model.js";
import {verifyToken} from "../Middlewares/verify_token.js"
export const commonRoute=exp.Router();
//login
commonRoute.post("/login",async(req,res)=>{
     let authorCred = req.body;
     //call authenticate service
     let {token,user}= await authenticate(authorCred);
     //save token as httponly cookie
     res.cookie("token", token, {
     httpOnly: true,
     secure: true,        // MUST (you are on HTTPS)
     sameSite: "None",    // MUST (cross-origin)
     path: "/"
});
     res.status(201).json({
    message: "login success",
    payload: user,
    token: token
  });
})

//logout
commonRoute.get("/logout",async(req,res)=>{
     //clear all the cookies
     //must match orginal settings
     res.clearCookie("token", {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/"
});
     res.status(200).json({message:"loged out sucessfully"})
})

//change password
commonRoute.put('/change-password',async(req,res)=>{
     //get current password and new password
     let {email,currentPassword,newPassword}=req.body;
     //findUser
     let userObj= await UserTypeModel.findOne({email})
     if(!userObj){
          return res.status(400).json({message:"user not found enter currect email"})
     }
     //check the current password is currect
     let isMatch= await bcrypt.compare(currentPassword,userObj.password);
     if(!isMatch){
          return res.status(400).json({message:"invalid currect password"})
     }
     //replace current password with the new password
     await UserTypeModel.findByIdAndUpdate(userObj._id,{
          $set:{password:await bcrypt.hash(newPassword,10)}
     })
     //send res
     return res.status(200).json({message:"password updated"})
})

//Check auth (restore session)
commonRoute.get("/check-auth", verifyToken("USER","AUTHOR","ADMIN"), async (req, res) => {
  res.status(200).json({
     message:"authenticated",
     payload:req.user
  })
});