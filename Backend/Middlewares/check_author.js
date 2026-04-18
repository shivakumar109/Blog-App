import { UserTypeModel } from "../Models/user_model.js";

export const checkAuthor=async(req,res,next)=>{
     //get author id
     let authorId = req.user.userId;
     // verify author
     let author = await UserTypeModel.findById(authorId);
     //if author is not found
     if(!author || author.role !== "AUTHOR"){
          return res.status(401).json({message:"Invalid author"})
     }
     //if author found and invalid role
     if(author.role!='AUTHOR'){
          return res.status(403).json({message:"User is not an author"})
     }
     //if author is blocked
     if(!author.isActive){
          return res.status(403).json({message:"author account is not active"})
     }
     //forword to next
     next(); 
}