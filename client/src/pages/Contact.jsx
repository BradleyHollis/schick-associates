import { useState } from "react";
import { sendMessage } from "../lib/api";

export default function Contact(){
  const [form,setForm]=useState({name:"",email:"",phone:"",subject:"",message:""});
  const [status,setStatus]=useState(null);
  const onChange = e => setForm({...form,[e.target.name]:e.target.value});
  const onSubmit = async e => {
    e.preventDefault(); setStatus("sending");
    try{ await sendMessage(form); setStatus("sent"); setForm({name:"",email:"",phone:"",subject:"",message:""});}
    catch(e){ setStatus(e.response?.data?.error||"Failed to send"); }
  };
  return (
    <section className="section container">
      <h2 style={{fontSize:36, marginBottom:12}}>Contact</h2>
      <div className="hr"></div>
      <form onSubmit={onSubmit} style={{display:"grid", gap:12, maxWidth:600}}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={onChange} />
        <input name="subject" placeholder="Subject (optional)" value={form.subject} onChange={onChange} />
        <textarea name="message" rows={6} placeholder="How can we help?" value={form.message} onChange={onChange} required></textarea>
        <button className="btn" type="submit" disabled={status==="sending"}>
          {status==="sending" ? "Sending…" : "Send message"}
        </button>
        {status==="sent" && <p style={{color:"green"}}>Thanks! We’ll be in touch.</p>}
        {status && status!=="sent" && status!=="sending" && <p style={{color:"crimson"}}>{status}</p>}
      </form>
    </section>
  );
}
