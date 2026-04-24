import React, { useEffect, useState } from 'react'
import { useAuth } from '../Store/AuthStore'
import { useNavigate } from 'react-router'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { set } from 'react-hook-form'
function UserDashbord() {
  //get logout function from store
  const logout=useAuth(state=>state.logout)
  const currentUser=useAuth(state=>state.currentUser)
  console.log(currentUser)
  const navigate=useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(()=>{
    const getArticals=async()=>{
    setLoading(true)
    //fetch articals
    try{
      let res=await axios.get("http://localhost:4000/user-api/articles",{withCredentials:true})
      //console.log(res)
      setArticles(res.data.payload);
      }catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    getArticals();
  },[])
  //perform logout and navigate
  // const onLogout=async()=>{
  //   await logout();
  //   toast.success("Logout success")
  //   navigate('/login');
  // }
  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };
  return (
  <div className="p-6">

    {/* Top Bar */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Welcome {currentUser.firstName}</h1>
      {currentUser && (<img src={currentUser.profileImageUrl} alt="profile" />)}
      

    </div>

    {/* Articles Grid */}
    <h1 className="text-2xl font-bold">Articles</h1>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {articles.map((article) => (
        <div
          key={article._id}
          className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            {article.title}
          </h2>

          <p className="text-blue-500 font-medium mb-2">
            {article.category}
          </p>
          <p className="text-gray-600 text-sm">
            {article.content}
          </p>
          {/* Button at bottom */}
              <button className=' mt-auto pt-4 bg-green-200' onClick={() => navigateToArticleByID(article)}>
                Read Article →
              </button>
        </div>
      ))}

    </div>

  </div>
)
}

export default UserDashbord