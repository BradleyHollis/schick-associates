import { useState } from "react";
import api from "../lib/api";

export default function Login() {
  const [usernameOrEmail, setU] = useState("");
  const [password, setP] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/login", { usernameOrEmail, password });
      const me = await api.get("/api/me");
      setMsg(`Hello ${me.data.userId}`);
    } catch (err) {
      setMsg(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={usernameOrEmail} onChange={e=>setU(e.target.value)} placeholder="username or email" />
      <input type="password" value={password} onChange={e=>setP(e.target.value)} placeholder="password" />
      <button type="submit">Log in</button>
      <div>{msg}</div>
    </form>
  );
}