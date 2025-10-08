// src/pages/Contact.jsx
import { useState } from "react";
import Page from "../components/Page";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [status, setStatus] = useState("");

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Page title="Contact">
      <form onSubmit={onSubmit} style={{display:"grid", gap:12, maxWidth:600}}>
        <input name="name" placeholder="Name" onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" onChange={onChange} required />
        <input name="phone" placeholder="Phone (optional)" onChange={onChange} />
        <input name="subject" placeholder="Subject (optional)" onChange={onChange} />
        <textarea name="message" placeholder="How can we help?" rows="6" onChange={onChange} required />
        <button className="btn btn--accent" disabled={status==="sending"}>Send message</button>
        {status==="sent" && <p style={{color:"green"}}>Thanks — we’ll be in touch.</p>}
        {status==="error" && <p style={{color:"crimson"}}>Something went wrong. Try again?</p>}
      </form>
    </Page>
  );
}
