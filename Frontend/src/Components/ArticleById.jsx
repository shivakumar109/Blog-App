import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { useAuth } from "../Store/AuthStore"
import toast from "react-hot-toast";
import api from "../APIs/axios";
function ArticleById() {
     const { id } = useParams();
     const location = useLocation();
     const navigate = useNavigate();
     const { register, handleSubmit } = useForm();
     const user = useAuth((state) => state.currentUser);
     const [article, setArticle] = useState(location.state || null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
     useEffect(() => {
          const getArticle = async () => {
               setLoading(true);
               try {
                    const res = await api.get(`/user-api/article/${id}`);
                    setArticle(res.data.payload);
               } catch (err) {
                    setError(err.response?.data?.error);
               } finally {
                    setLoading(false);
               }
          };
          getArticle();
     }, [id]);
     const addComment = async (commentObj) => {
  try {
    commentObj.articleId = article._id;

    const res = await api.put(
  "/user-api/articleComment",
  commentObj
);

    if (res.status === 200) {
      toast.success(res.data.message);

      //  update UI with new comments
      setArticle(res.data.payload);
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to add comment");
  }
};
  if (loading) return <p >Loading article...</p>;
  if (error) return <p >{error}</p>;
  if (!article) return null;
     return (
          <div className="max-w-3xl mx-auto p-6">
               {article && (
                    <div className="bg-white shadow-lg rounded-xl p-8">
                         {/* Title */}
                         <h1 className="text-3xl font-bold mb-4">{article.title} </h1>
                         {/* Author */}
                         <div className="mb-6 border-b pb-4">
                              <p className="font-semibold">Author: {article.author?.firstName}</p>
                              <p className="text-sm text-gray-500"> {article.author?.email}</p>
                         </div>
                         {/* Category */}
                         <p className="text-blue-500 font-medium mb-4">  Category: {article.category}</p>
                         {/* Content */}
                         <p className="text-gray-700 mb-8">{article.content} </p>
                         {/* form to add comment if role is USER */}
                         {/* USER actions */}
                         {user?.role === "USER" && (
                         <div >
                              <form onSubmit={handleSubmit(addComment)}>
                              <input
                              type="text"
                              {...register("comment")}
                              placeholder="Write your comment here..."
                              />
                              <button type="submit" className="bg-amber-600 text-white px-5 py-2 rounded-2xl mt-5">
                              Add comment
                              </button>
                              </form>
                         </div>
                         )}
                         {/* Comments */}
                         <h2 className="text-xl font-semibold mb-4">Comments</h2>
                         {article.comments?.map((c) => (
                              <div key={c._id} className="bg-gray-100 p-3 rounded mb-3">
                                   <p>{c.comment}</p>
                                   <p className="text-sm text-gray-500"> By {c.user?.firstName}</p>
                              </div>
                         ))}
                        
                    </div>
               )}
          </div>
     );
}

export default ArticleById