// client/src/api.js
import axios from "axios";

const api = axios.create({
  // e.g. http://localhost:4000 (set in client/.env.local)
  baseURL: (import.meta.env.VITE_API_URL || "").replace(/\/+$/, ""),
  withCredentials: true,                      // harmless now; useful when you add auth
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

// POST /api/messages  -> { id }
export function sendMessage({ name, email, phone = "", subject = "", message }) {
  return api.post("/api/messages", { name, email, phone, subject, message });
}

// optional: quick health check
export const getHealth = () => api.get("/health");

export default api;