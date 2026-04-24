import exp from 'express'
import { register } from '../Services/auth_service.js'
import { UserTypeModel } from '../Models/user_model.js';
import { ArticleTypeModel } from '../Models/article_model.js'
import { checkAuthor } from '../Middlewares/check_author.js'
import { authenticate } from '../Services/auth_service.js';
import { verifyToken } from '../Middlewares/verify_token.js';
import { uploadToCloudinary } from '../Config/cloudinaryUpload.js';
import { upload } from '../Config/multer.js';
import cloudinary from '../Config/cloudinary.js';
export const authorRoute=exp.Router();

//Register author(public)
authorRoute.post("/users", upload.single("profileImageUrl"), async (req, res, next) => {
  let cloudinaryResult;
  try {
    
    let userObj = req.body;
    const existingUser = await UserTypeModel.findOne({ email: userObj.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }
    //  Step 1: upload image to cloudinary from memoryStorage (if exists)
    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
    }
    // Step 2: call existing register()
    const newUserObj = await register({
      ...userObj,
      role: "AUTHOR",
      profileImageUrl: cloudinaryResult?.secure_url,
    });
    res.status(201).json({
      message: "user created",
      payload: newUserObj,
    });
  } catch (err) {
    // Step 3: rollback
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    next(err); // send to your error middleware
  }
});
//create artical (protected)
authorRoute.post('/article',verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{
     //get artical from req
     let artical = req.body;
     //create artical document
     let newArticalDoc = new ArticleTypeModel({author:req.user.userId,...artical})
     //save
     let createArticalDoc = await newArticalDoc.save()
     //send res
     return res.status(200).json({messang:"artical created"})
})
//read articals of author(protected)
authorRoute.get("/articles",verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{
     //get authorID
     let authorId= req.user.userId;
     //read artical by the author
     let article = await ArticleTypeModel.find({author:authorId,isArticalActive:true}).populate('author','firstName email')
     //send res
     return res.status(200).json({message:"article",payload:article})
})
//edit aritcal (protected)
authorRoute.put("/articles",verifyToken("AUTHOR"),checkAuthor,async(req,res)=>{
     //get modified artical from request
     let author=req.user.userId;
     let {articleId,title,category,content}=req.body;
     //find the article
     let article= await ArticleTypeModel.findById({_id:articleId,author:author});
     if(!article){
          return res.status(400).json({message:"article not found"});
     }
     
     //update the article
     let updatedArticle=await ArticleTypeModel.findByIdAndUpdate(articleId,{
          $set:{title,category,content}}
     ,{
          new:true
     })
     //send res
     return res.status(200).json({message:'artical updated',payload:updatedArticle})
})
//delete(soft delete) article(Protected route)
authorRoute.patch("/articles/:id/status", verifyToken("AUTHOR"), async (req, res) => {
  const { id } = req.params;
  const { isArticalActive} = req.body;
  // Find article
  const article = await ArticleTypeModel.findById(id); //.populate("author");
  //console.log(article)
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  //console.log(req.user.userId,article.author.toString())
  // AUTHOR can only modify their own articles
  if (req.user.role === "AUTHOR" && 
    article.author.toString() !== req.user.userId) {
    return res
    .status(403)
    .json({ message: "Forbidden. You can only modify your own articles" });
  }
  // Already in requested state
  if (article.isArticalActive===isArticalActive) {
    return res.status(400).json({
      message: `Article is already ${ isArticalActive? "active" : "deleted"},` });
  }

  //update status
  article.isArticalActive= isArticalActive;
  await article.save();

  //send res
  res.status(200).json({
    message: `Article ${ isArticalActive ? "restored" : "deleted"} successfully,`
  });
});