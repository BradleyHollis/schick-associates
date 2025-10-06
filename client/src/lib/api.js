// client/src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // reads from client/.env.local
  withCredentials: true                 // send/receive auth cookie
});

export default api;