import {useEffect,useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuth } from '../Store/AuthStore'
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
        const res = await axios.get('http://localhost:4000/author-api/articles', { withCredentials: true });
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
    await axios.patch(
      `http://localhost:4000/author-api/articles/${id}/status`,
      { isArticalActive: false },
      { withCredentials: true }
    );

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
 return (
  <div>
    <h2>My Articles</h2>

    {loading && <p>Loading...</p>}
    {error && <p style={{ color: "red" }}>{error}</p>}

    {articles.length === 0 && !loading && (
      <p>No articles found</p>
    )}

    {articles.map((article) => (
  <div key={article._id} style={{
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px",
    borderRadius: "8px"
  }}>
    <h3>{article.title}</h3>
    <p><b>Category:</b> {article.category}</p>
    <p>{article.content}</p>
    <small>
      Created: {new Date(article.createdAt).toLocaleString()}
    </small>

    {/*  Buttons */}
    <div style={{ marginTop: "10px" }}>
      <button 
        onClick={() => handleEdit(article)}
        style={{ marginRight: "10px", background: "orange", color: "white" }}
      >
        Edit
      </button>

      <button 
        onClick={() => handleDelete(article._id)}
        style={{ background: "red", color: "white" }}
      >
        Delete
      </button>
    </div>
  </div>
))}
  </div>
);
}

export default Articles