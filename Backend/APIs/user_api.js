import exp from 'express'
import { register, authenticate} from '../Services/auth_service.js'
import { checkAuthor} from '../Middlewares/check_author.js'
import { verifyToken } from '../Middlewares/verify_token.js';
import { ArticleTypeModel } from '../Models/article_model.js';
import { UserTypeModel } from '../Models/user_model.js';
import { uploadToCloudinary } from '../Config/cloudinaryUpload.js';
import { upload } from '../Config/multer.js';
import cloudinary from '../Config/cloudinary.js';
export const userRoute=exp.Router();

//Register user     
userRoute.post("/users", upload.single("profileImageUrl"),async (req, res, next) => {
        

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
                role: "USER",
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
        }
        );
//Read all articals(protected )
userRoute.get('/articles',verifyToken("USER"),async(req,res)=>{
     //find article
     let articles = await ArticleTypeModel.find({isArticalActive:true}).populate("comments.user","email firstName");
     //if artical not found
     if(!articles){
          return res.status(400).json({message:"article not found"});
     }
     //send res
     return res.status(200).json({message:"article",payload:articles});
})
//get artical by id
userRoute.get("/article/:articleId", verifyToken("USER"), async (req, res) => {

  const articleId = req.params.articleId;

  const article = await ArticleTypeModel
    .findById(articleId)
    .populate("author", "firstName email")
    .populate("comments.user", "firstName");

  if (!article) {
    return res.status(404).json({
      message: "No article found"
    });
  }

  return res.status(200).json({
    message: "article",
    payload: article
  });

});
//add comment to the artical(procted )
userRoute.put('/articleComment', verifyToken("USER"), async (req,res)=>{

  let userId = req.user.userId;
  let { articleId, comment } = req.body;

  let article = await ArticleTypeModel.findByIdAndUpdate(
    articleId,
    {
      $push:{ comments:{ user:userId, comment } }
    },
    { new:true, runValidators:true }
  ).populate("comments.user","email firstName");

  if(!article){
    return res.status(404).json({message:"Article not found"});
  }

  return res.status(200).json({message:"Comment added",payload:article});
});
