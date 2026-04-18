import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {useAuth} from '../Store/AuthStore'
import { useNavigate ,NavLink } from 'react-router'
import { toast } from 'react-hot-toast'
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
    <div className="bg-gray-200 p-10 rounded m-10">
      <h1 className='text-center text-4xl font-bold text-blue-400 mb-4'>Log in</h1>
      {error && <p className='text-red-500 text-center'>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Role */}
        <div className="flex justify-center gap-6 items-center">
          <p className="text-lg">Select Role</p>
            <input type="radio" value="user"
              {...register("role", { required: true })}/> User
            <input type="radio" value="author"
              {...register("role", { required: true })}/>Author
        </div>
        {errors?.role && <p className="text-red-500 text-sm text-center">*role is required</p>}
        {/* Email */}
        <input type="email" placeholder="Email" className="p-3 bg-gray-300 rounded"
          {...register("email", { required: true })} />
        {errors?.email && <p className="text-red-500 text-sm">*email is required</p>}
        {/* Password */}
        <input
          type="password"   placeholder="Password"  className="p-3 bg-gray-300 rounded"
          {...register("password", { required: true, minLength: 4 })} />
        {errors?.password && <p className="text-red-500 text-sm">password is required</p>}
        {/* Button */}
        <button
          type="submit"
          className="bg-sky-500 text-white py-2 rounded w-36 mx-auto">
          Login
        </button>
        {/* Footer note */}
        <p className='text-center mt-5'>
          Don't have an account?{" "}
          <NavLink to="/register">
            Create one
          </NavLink>
        </p>
      </form>
    </div>
  )
}

export default Login