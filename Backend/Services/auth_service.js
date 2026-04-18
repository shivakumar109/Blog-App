import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserTypeModel } from '../Models/user_model.js'
import { config  } from 'dotenv';
config()

//regidter function
export const register= async (userObj)=>{
     //create document
     const userDoc = new UserTypeModel(userObj);
     //validate for the empty password
     await userDoc.validate();
     //hash and replace plain password
     userDoc.password = await bcrypt.hash(userDoc.password,10);
     //save
     const created = await userDoc.save();
     //convet document to object to password
     const newUserObj = created.toObject();
     //remove password
     delete newUserObj.password;
     //return the obj without password
     return newUserObj;
}

//authenticate function
export const authenticate = async ({email,password})=>{
     //check user with email and role
     const user = await UserTypeModel.findOne({email});
     if(!user){
          const err= new Error("Invalid email");
          err.status= 401;
          throw err;
     }
     //if user is valide ,but blocked by admin
     if(user.isActive===false){
          const err= new Error("Your account is blocked PLz contact Admin")
          err.status=401;
          throw err;
     }
     //compare passwords
     const isMatch= await bcrypt.compare(password,user.password);
     if(!isMatch){
          const err = new Error("Invalid Password");
          err.status=401;
          throw err;
     }

     //generte token
     const token = jwt.sign({userId: user._id,
          role:user.role,
          email: user.email,
          firstName: user.firstName,
          profileImageUrl: user.profileImageUrl},
          process.env.JWT_SECRET,{
          expiresIn:"1h"
     });
     //convet user to obj
     const userObj= user.toObject();
     //delete password
     delete userObj.password;
     //return       
     return {token ,user:userObj}
}