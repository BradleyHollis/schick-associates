// client/src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || "").replace(/\/+$/, ""), // no trailing slash
  withCredentials: true, // harmless now; useful if/when you add auth cookies
  headers: { "Content-Type": "application/json" },
  timeout: 10000
});

// --- API calls ---

/** Marketing list subscribe (double opt-in) */
export function subscribe({ email, firstName, lastName, source = "home" }) {
  return api.post("/api/subscribe", { email, firstName, lastName, source })
           .then(r => r.data);
}

/** Contact/inquiry message (optional but recommended) */
export function sendContact({ email, name, phone, message }) {
  return api.post("/api/contact", { email, name, phone, message })
           .then(r => r.data);
}

/** Health check */
export function getHealth() {
  return api.get("/health").then(r => r.data);
}

export default api;
