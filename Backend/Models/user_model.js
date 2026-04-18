import { Schema , model } from "mongoose";

const userSchema = new Schema({
     firstName:{
          type:String,
          required:[true, "First Name Required"]
     },
     lastName:{
          type:String,
          required:[true, "Last Name Required"]
     },
     email:{
          type:String,
          required:[true, "Email Required"],
          unique:[true," Email is already exits"]
     },
     password:{
          type:String,
          required:[true, "Password Required"]
     },
     profileImageUrl:{
          type:String,
     },
     role:{
          type:String,
          enum:['AUTHOR','USER','ADMIN'],
          required:[true,"{Value} is an invalid role"]
     },
     isActive:{
          type: Boolean,
          default:true
     }
},{
     timestamps:true,
     strict:"throw",
     versionKey:false
})
//create Model
export const UserTypeModel = model("user",userSchema);
