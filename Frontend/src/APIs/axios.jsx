import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-app-backend-gfq3.onrender.com",
  withCredentials: true,
});

export default api;