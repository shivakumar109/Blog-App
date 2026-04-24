import React from 'react'
import { useNavigate ,NavLink} from 'react-router';
import {useAuth} from '../Store/AuthStore'
import toast from 'react-hot-toast';
function AuthorDashboard() {
  //read articals of his own
  //display them in the form cards
  const logout=useAuth(state=>state.logout)
  const navigate=useNavigate();
  // const onLogout=async()=>{
  //   await logout();
  //   toast.success("Logout success")
  //   navigate('/login');
  // }
  return (
    <div className="flex justify-between items-center mt-8">
      <h1 className="text-2xl font-bold">Author</h1>
      <NavLink className="bg-blue-500 text-white px-5 py-2 rounded-lg "
          to="/articles">
          My Articles
        </NavLink>

        <NavLink className="bg-blue-500 text-white px-5 py-2 rounded-lg "
          to="/addartical">
          Add Article
        </NavLink>
      
    </div>
  )
}

export default AuthorDashboard