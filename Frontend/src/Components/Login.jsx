import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {useAuth} from '../Store/AuthStore'
import { useNavigate ,NavLink } from 'react-router'
import { toast } from 'react-hot-toast'
import api from "../APIs/axios";
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const login=useAuth(state=>state.login)
  const isAuthenticated=useAuth(state=>state.isAuthenticated)
  const currentUser=useAuth(state=>state.currentUser)
  const error = useAuth((state) => state.error);
  const navigate=useNavigate()
  //console.log(isAuthenticated)
  //console.log(currentUser)
  const onSubmit = async(loginCred) => {
    //console.log(loginCred)
    await login(loginCred)
    //console.log(isAuthenticated)
  }
  useEffect(()=>{
    if(isAuthenticated){
      if(currentUser.role==="USER"){
        toast.success("Logined successfully")
        navigate("/userdashbord")
      }
      else if (currentUser.role==="AUTHOR"){
        toast.success("Logined successfully")
        navigate("/authordashbord")
      }
    }
  },[isAuthenticated,currentUser])
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    
    <div className="bg-white w-full max-w-md p-6 md:p-10 rounded-xl shadow-lg">
      
      <h1 className="text-center text-3xl md:text-4xl font-bold text-blue-500 mb-6">
        Log in
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">

        {/* Role */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-lg">Select Role</p>

          <label className="flex items-center gap-1">
            <input type="radio" value="user" {...register("role", { required: true })}/> 
            User
          </label>

          <label className="flex items-center gap-1">
            <input type="radio" value="author" {...register("role", { required: true })}/> 
            Author
          </label>
        </div>

        {errors?.role && <p className="text-red-500 text-sm text-center">*role is required</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-200 rounded"
          {...register("email", { required: true })}
        />
        {errors?.email && <p className="text-red-500 text-sm">*email is required</p>}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-200 rounded"
          {...register("password", { required: true, minLength: 4 })}
        />
        {errors?.password && <p className="text-red-500 text-sm">password is required</p>}

        {/* Button */}
        <button
          type="submit"
          className="bg-sky-500 text-white py-2 rounded w-full md:w-36 mx-auto hover:bg-sky-600 transition"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-500 font-medium hover:underline">
            Create one
          </NavLink>
        </p>

      </form>
    </div>
  </div>
);
}

export default Login