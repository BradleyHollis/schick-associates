// client/src/lib/api.js
import axios from "axios";

const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
if (!base) {
  // Fallback for preview environments: same origin
  // (assumes you might proxy /api in dev)
  console.warn("VITE_API_URL not set; falling back to current origin");
}

const api = axios.create({
  baseURL: base || "", // if "", axios will use relative URLs
  withCredentials: true, // fine; your server allows credentials
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Optional: normalize errors so UI gets a friendly message
api.interceptors.response.use(
  (r) => r,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(msg));
  }
);

// --- API calls ---
export function subscribe({ email, firstName, lastName, source = "home" }) {
  return api.post("/api/subscribe", { email, firstName, lastName, source })
           .then((r) => r.data);
}

export function sendContact({ email, name, phone, subject, message }) {
  return api.post("/api/contact", { email, name, phone, subject, message })
           .then((r) => r.data);
}

export function getHealth() {
  return api.get("/health").then((r) => r.data);
}

export default api;
