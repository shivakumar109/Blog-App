import {useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuth } from '../Store/AuthStore'
import api from "../APIs/axios";
function Articles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //console.log("user in author profile",user)
  //get author articals
  useEffect(() => {
    if (!user) return;
    const getAuthorArticles = async () => {
      setLoading(true);
      try {
        const res = await api.get("/author-api/articles");
        console.log(res.data.payload)
        setArticles(res.data.payload);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    getAuthorArticles();
  }, [user]);

  const handleDelete = async (id) => {
  try {
    await api.patch(`/author-api/articles/${id}/status`, {
  isArticalActive: false
});

    //  Remove from UI instantly
    setArticles(prev => prev.filter(a => a._id !== id));

  } catch (err) {
    console.log(err);
  }
};

//  Edit navigation
const handleEdit = (article) => {
navigate('/addartical', { state: article });
};
  return(
  <div className="p-4 md:p-8 max-w-6xl mx-auto">
    <h2 className="text-2xl font-bold mb-6 text-center md:text-left">My Articles</h2>

    {loading && <p className="text-center text-gray-500">Loading...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}

    {articles.length === 0 && !loading && (
      <p className="text-center text-gray-500">No articles found</p>
    )}

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {articles.map((article) => (
  <div key={article._id} className="bg-white p-6 shadow-md rounded-xl border border-gray-100 flex flex-col transition hover:shadow-lg">
    <h3 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h3>
    <p className="text-blue-500 text-sm font-semibold mb-3">{article.category}</p>
    <p className="text-gray-600 mb-4 flex-grow">{article.content}</p>
    <small className="text-gray-400 block mb-4">
      Created: {new Date(article.createdAt).toLocaleString()}
    </small>

    {/*  Buttons */}
    <div className="flex gap-3 mt-auto">
      <button 
        onClick={() => handleEdit(article)}
        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition"
      >
        Edit
      </button>

      <button 
        onClick={() => handleDelete(article._id)}
        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
      >
        Delete
      </button>
    </div>
  </div>
))}
</div>
  </div>
);
}

export default Articles