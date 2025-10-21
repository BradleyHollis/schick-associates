import { sendMessage } from "../lib/api";
import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    first: "", last: "", email: "", phone: "", topic: "Selling a business",
  });
  const [status, setStatus] = useState(null);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault(); setStatus("sending");
    try {
      await sendMessage({
        name: `${form.first} ${form.last}`.trim(),
        email: form.email, phone: form.phone,
        subject: form.topic, message: "(Website signup)"
      });
      setStatus("sent");
      setForm({ first:"", last:"", email:"", phone:"", topic:"Selling a business" });
    } catch (err) { setStatus(err.response?.data?.error || "Failed to send"); }
  };

  return (
    <section className="section">
      <div className="sa-container signup">
        <h2 className="title-serif title-lg">Sign up for more information</h2>
        <form className="form" onSubmit={onSubmit}>
          <input name="first" placeholder="First name" value={form.first} onChange={onChange} required />
          <input name="last" placeholder="Last name" value={form.last} onChange={onChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} required />
          <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={onChange} />
          <select name="topic" value={form.topic} onChange={onChange}>
            <option>Selling a business</option>
            <option>Growth capital</option>
            <option>Strategic acquisition</option>
            <option>Other</option>
          </select>
          <button className="btn btn--accent" disabled={status==="sending"}>
            {status==="sending" ? "Submitting…" : "Submit"}
          </button>
          {status==="sent" && <div className="ok">Thanks! We’ll be in touch.</div>}
          {status && status!=="sent" && status!=="sending" && <div className="err">{status}</div>}
        </form>
      </div>
    </section>
  );
}