import { useState } from "react";
import { subscribe, sendContact } from "../lib/api";

export default function Signup() {
  const [form, setForm] = useState({
    first: "", last: "", email: "", phone: "", topic: "Selling a business",
  });

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [devConfirmUrl, setDevConfirmUrl] = useState("");


  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }


  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    setDevConfirmUrl("");

    try {
      // 1️⃣ Send to /api/subscribe
      const sub = await subscribe({
        email: form.email.trim(),
        firstName: form.first.trim(),
        lastName: form.last.trim(),
        source: "home",
      });

      setMessage(sub.message || "Thanks! Please check your email to confirm.");
      if (sub.confirmUrl) setDevConfirmUrl(sub.confirmUrl);
      setStatus("sent");

      // 2️⃣ (Optional) send the same details to /api/contact for CRM tracking
      if (form.topic || form.phone) {
        sendContact({
          email: form.email.trim(),
          name: `${form.first} ${form.last}`.trim(),
          phone: form.phone.trim(),
          message: `Signup via Home. Topic: ${form.topic}`,
        }).catch(() => {});
      }

      // Reset fields if you like
      setForm({
        first: "",
        last: "",
        email: "",
        phone: "",
        topic: "Selling a business",
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "Failed to submit. Please try again.");
    }
  }

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
            {message && (
              <div
                className={`mt-2 text-sm ${
                  status === "error" ? "text-red-600" : "text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            {devConfirmUrl && (
              <p className="text-xs mt-1">
                Dev confirm link:{" "}
                <a href={devConfirmUrl} className="underline text-blue-600">
                  click here
                </a>
              </p>
            )}
        </form>
      </div>
    </section>
  );
}