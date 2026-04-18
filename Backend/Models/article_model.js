import { Schema,model } from "mongoose";

//create user comment schema
const userCommentSchema=new Schema({
     user:{
          type:Schema.Types.ObjectId,
          ref:'user',
     },
     comment:{
          type:String
     }
})

//create authoe Schema
const articleSchema = new Schema({
     author:{
          type:Schema.Types.ObjectId,
          ref:'user',
          required:[true,"Author is Required "]
     },
     title:{
          type:String,
          required:[true," Title is required"]
     },
     category:{
          type:String,
          required:[true," Category is required"]
     },
     content:{
          type:String,
          required:[true," Content is required"]
     },
     comments:{
          type:[userCommentSchema]
     },
     isArticalActive:{
          type:Boolean,
          default:true
     }},{
     timestamps:true,
     strict:"throw",
     versionKey:false
})

export const ArticleTypeModel = model("article",articleSchema);