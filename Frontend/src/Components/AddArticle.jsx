import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router';
import toast from 'react-hot-toast';
import api from "../APIs/axios";

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
await api.put(
  "/author-api/articles",
  {
    articleId: editData._id,
    ...data
  }
);

toast.success("update  success")

  } else {
    //  ADD MODE
    await api.post(
  "/author-api/article",
  data
);

  }

  //  Correct route
  navigate('/articles');

} catch (err) {
  //console.log("Error:", err);
  alert("Something went wrong");
}


};

return ( <div className="p-4 md:p-8 mt-6 max-w-3xl mx-auto"> <div className="bg-white shadow-md p-6 md:p-10 rounded-xl border"> <h2 className="text-2xl font-bold mb-6 text-center">{editData ? "Edit Article" : "Create New Article"}</h2> <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">


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
