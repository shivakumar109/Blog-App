import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';

function AddArticle() {
const { register, handleSubmit, formState: { errors }, reset } = useForm();
const navigate = useNavigate();
const location = useLocation();

const editData = location.state; 

// Prefill form when editing
useEffect(() => {
if (editData) {
reset(editData);
}
}, [editData, reset]);

const onSubmit = async (data) => {
try {
if (editData) {
// EDIT MODE
await axios.put(
'http://localhost:4000/author-api/articles',
{
articleId: editData._id,
...data
},
{ withCredentials: true }
);

toast.success("update  success")

  } else {
    //  ADD MODE
    await axios.post(
      'http://localhost:4000/author-api/article',
      data,
      { withCredentials: true }
    );

  }

  //  Correct route
  navigate('/articles');

} catch (err) {
  //console.log("Error:", err);
  alert("Something went wrong");
}


};

return ( <div className="bg-gray-200 p-10 rounded m-10"> <div className="bg-gray-200 p-10 rounded"> <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">


      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        className="p-3 bg-gray-300 rounded"
        {...register("title", { required: true })}
      />
      {errors.title && <p className="text-red-500 text-sm">Title is required</p>}

      {/* Category */}
      <select
        className="p-3 bg-gray-300 rounded"
        {...register("category", { required: true })}
      >
        <option value="technology">Technology</option>
        <option value="programming">Programming</option>
        <option value="ai">AI</option>
        <option value="news">News</option>
      </select>
      {errors.category && <p className="text-red-500 text-sm">Category is required</p>}

      {/* Content */}
      <textarea
        rows="6"
        placeholder="Content"
        className="p-3 bg-gray-300 rounded"
        {...register("content", { required: true })}
      />
      {errors.content && <p className="text-red-500 text-sm">Content is required</p>}

      {/* Button */}
      <button
        type="submit"
        className="bg-sky-500 text-white py-2 px-6 rounded w-48 mx-auto"
      >
        {editData ? "Update Article" : "Publish Article"}
      </button>

    </form>
  </div>
</div>


);
}

export default AddArticle;
