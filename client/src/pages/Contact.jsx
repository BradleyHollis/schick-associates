// src/pages/Contact.jsx
import { useState } from "react";
import { sendContact } from '../lib/api';
import Page from "../components/Page";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const data = await sendContact(form);
      setStatus("sent");
      setFeedback(data.message || "Thanks, your message has been received!");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback("There was an error sending your message. Please try again.");
    }
  };

  return (
    <Page title="Contact">
      <form onSubmit={handleSubmit} style={{display:"grid", gap:12, maxWidth:600}}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
        <input name="subject" placeholder="Subject (optional)" value={form.subject} onChange={handleChange} />
        <textarea name="message" placeholder="How can we help?" value={form.message} rows="6" onChange={handleChange} required />
        <button className="btn btn--accent" disabled={status==="sending"}>{status === "sending" ? "Sending…" : "Send message"}</button>
        {feedback && (
        <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-700"}`}>
          {feedback}
        </p>
      )}
      </form>
    </Page>
  );
}
