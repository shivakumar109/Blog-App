import React from 'react'
import { useForm } from 'react-hook-form'
function AddArticle() {
  const { register, handleSubmit, formState:{errors} } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div className="bg-gray-200 p-10 rounded m-10">
      <div className="bg-gray-200 p-10  rounded">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="p-3 bg-gray-300 rounded"
            {...register("title",{required:true})}/>
          {errors.title && <p className="text-red-500 text-sm">title is required</p>}
          {/* Category */}
          <select className="p-3 bg-gray-300 rounded"{...register("category",{required:true})}> 
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="news">News</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">category is required</p>}
          {/* Content */}
          <textarea
            rows="6"
            placeholder="Content"
            className="p-3 bg-gray-300 rounded"
            {...register("content",{required:true})}/>
          {errors.content && <p className="text-red-500 text-sm">content is requirede</p>}
          {/* Button */}
          <button type="submit" className="bg-sky-500 text-white py-2 px-6 rounded w-48 mx-auto">Publish Article
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddArticle