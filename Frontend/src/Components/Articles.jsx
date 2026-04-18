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
  return (
    <div>Articles</div>
  )
}

export default Articles