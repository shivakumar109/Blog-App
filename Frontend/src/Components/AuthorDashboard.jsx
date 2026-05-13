import React from 'react'
import { useNavigate ,NavLink} from 'react-router';
import {useAuth} from '../Store/AuthStore'
import toast from 'react-hot-toast';
import api from "../APIs/axios";
function AuthorDashboard() {
  //read articals of his own
  //display them in the form cards
  const currentUser = useAuth(state => state.currentUser)
  const logout=useAuth(state=>state.logout)
  const navigate=useNavigate();
  // const onLogout=async()=>{
  //   await logout();
  //   toast.success("Logout success")
  //   navigate('/login');
  // }
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 px-4 md:px-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Author</h1>
      <NavLink className="bg-blue-500 text-white px-5 py-2 rounded-lg "
          to="/articles">
          My Articles
        </NavLink>

        <NavLink className="bg-blue-500 text-white px-5 py-2 rounded-lg "
          to="/addartical">
          Add Article
        </NavLink>
      {currentUser?.profileImageUrl && (
  <img
    src={currentUser.profileImageUrl}
    alt="profile"
    className="w-10 h-10 rounded-full object-cover border"
  />
)}
    </div>
  )
}

export default AuthorDashboard