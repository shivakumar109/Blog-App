import React, { useState ,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {useNavigate } from 'react-router'
import axios from 'axios'
import {toast} from "react-hot-toast"
import api from "../APIs/axios";
function Register() {
  const { register, handleSubmit ,formState:{errors} } = useForm()
  const [loading,setLoading]=useState(false)
  const [preview, setPreview] = useState(null);
  const [error,setError]=useState(null)
  let navigate=useNavigate()
  const onSubmit = async (newUser) => {
    setLoading(true)
    //console.log(newUser)
    // Create form data object
        const formData = new FormData();
        //get user object
        let { role, profileImageUrl, ...userObj } = newUser;
        //add all fields except profilePic to FormData object
        Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
        });
        // add profilePic to Formdata object
        formData.append("profileImageUrl", profileImageUrl[0]);
    try{
      //console.log(userData)
      if (role==='user'){
        //make api request to user
        let resObj = await api.post("/user-api/users", formData);
        //console.log("resObj=",resObj)
        if (resObj.status===201){
          toast.success('Successfully registered')
          navigate('/login')
        }
      }
      if (role==='author'){
        //make api request to
        let resObj = await api.post("/author-api/users", formData);
        console.log("resObj=",resObj)
        if (resObj.status===201){
          toast.success('Successfully registered')
          navigate('/login')
        }
      }
    }catch(err){
     // console.log(err)
      setError(err.response?.data?.error || "Registration Failed")
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
        }, [preview]);

  if (loading==true){
    return <p className="text-center text-xl">Loading...</p>
  }
  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    
    <div className="w-full max-w-2xl bg-white p-6 md:p-10 rounded-xl shadow-lg">
      
      <h1 className="text-2xl text-center mb-6">Register</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">

        {/* Role selection */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-lg">Select Role</p>
          <input type="radio" value="user" {...register("role",{required:true})}/> User
          <input type="radio" value="author" {...register("role",{required:true})}/> Author
          {errors.role && <p className="text-red-500 text-sm text-center">Role is required</p>}
        </div>

        {/* First and Last name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          First Name:
          <input
            type="text"
            placeholder="First name"
            {...register("firstName",{required:true , minLength:4})}
            className="w-full p-3 bg-gray-200 rounded"
          />
          {errors?.firstName?.type==="required" && <p className="text-red-500">*firstName Required</p>}
          {errors?.firstName?.type==="minLength" && <p className="text-red-500">*minLength 4</p>}

          LastName:
          <input
            type="text"
            placeholder="Last name"
            {...register("lastName" ,{required:true , minLength:4})}
            className="w-full p-3 bg-gray-200 rounded"
          />
          {errors?.lastName?.type==="required" && <p className="text-red-500">*lastName Required</p>}
          {errors?.lastName?.type==="minLength" && <p className="text-red-500">*minLength 4</p>}
        </div>

        {/* Email */}
        Email:
        <input
          type="email"
          placeholder="Email"
          {...register("email",{required:true})}
          className="w-full p-3 bg-gray-200 rounded"
        />
        {errors?.email?.type==="required" && <p className="text-red-500">*email Required</p>}

        {/* Password */}
        Password:
        <input
          type="password"
          placeholder="Password"
          {...register("password",{required:true})}
          className="w-full p-3 bg-gray-200 rounded"
        />
        {errors?.email?.type==="required" && <p className="text-red-500">*password Required</p>}
        Profile
        <input
        type="file"
        accept="image/png, image/jpeg"
        {...register("profileImageUrl")}
        onChange={(e) => {

            //get image file
            const file = e.target.files[0];
            // validation for image format
            if (file) {
                if (!["image/jpeg", "image/png"].includes(file.type)) {
                setError("Only JPG or PNG allowed");
                return;
                }
                //validation for file size
                if (file.size > 2 * 1024 * 1024) {
                setError("File size must be less than 2MB");
                return;
                }
                //Converts file → temporary browser URL(create preview URL)
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
                setError(null);
            }
        }}  className="p-3 bg-gray-300 rounded"/>
        {preview && (
                <div className="mt-3 flex justify-center">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-full border"
                />
                </div>
            )}

        {/* Button */}
        <button
          type="submit"
          className="bg-sky-500 text-white py-2 px-6 rounded w-full md:w-40 mx-auto hover:bg-sky-600 transition"
        >
          Register
        </button>

      </form>
    </div>
  </div>
);
}

export default Register