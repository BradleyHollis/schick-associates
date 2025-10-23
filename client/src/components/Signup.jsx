import { useState } from "react";
import { subscribe, sendContact } from "../lib/api";

export default function Signup() {
  const [form, setForm] = useState({
    first: "", last: "", email: "", phone: "", topic: "Selling a business",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [message, setMessage] = useState("");
  const [devConfirmUrl, setDevConfirmUrl] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return; // guard against double submit
    setStatus("sending");
    setMessage("");
    setDevConfirmUrl("");

    const firstName = form.first.trim();
    const lastName  = form.last.trim();
    const email     = form.email.trim().toLowerCase();
    const phone     = form.phone.trim();
    const topic     = form.topic;

    try {
      // 1) subscribe
      const sub = await subscribe({ email, firstName, lastName, source: "home" });
      setMessage(sub.message || "Thanks! Please check your email to confirm.");
      if (sub.confirmUrl) setDevConfirmUrl(sub.confirmUrl); // dev-only helper
      setStatus("sent");

      // 2) optional CRM-ish capture (fire & forget)
      if (email && (topic || phone)) {
        sendContact({
          email,
          name: `${firstName} ${lastName}`.trim(),
          phone,
          message: `Signup via Home. Topic: ${topic}`,
        }).catch(() => {});
      }

      setForm({ first: "", last: "", email: "", phone: "", topic: "Selling a business" });
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage(err?.response?.data?.message || err?.message || "Failed to submit. Please try again.");
    }
  }

  return (
    <section className="section">
      <div className="sa-container signup">
        <h2 className="title-serif title-lg">Sign up for more information</h2>

        <form className="form" onSubmit={onSubmit} noValidate>
          <input name="first" placeholder="First name" value={form.first} onChange={onChange}
                 autoCapitalize="words" required />
          <input name="last" placeholder="Last name" value={form.last} onChange={onChange}
                 autoCapitalize="words" required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange}
                 autoCapitalize="off" spellCheck="false" required />
          <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={onChange} />
          <select name="topic" value={form.topic} onChange={onChange}>
            <option>Selling a business</option>
            <option>Growth capital</option>
            <option>Strategic acquisition</option>
            <option>Other</option>
          </select>

          <button type="submit" className="btn btn--accent" disabled={status === "sending"}>
            {status === "sending" ? "Submitting…" : "Submit"}
          </button>

          {/* Announce status for a11y */}
          <div aria-live="polite" className="mt-2 text-sm">
            {message && (
              <div className={status === "error" ? "text-red-600" : "text-green-700"}>
                {message}
              </div>
            )}
          </div>

          {devConfirmUrl && (
            <p className="text-xs mt-1">
              Dev confirm link:{" "}
              <a href={devConfirmUrl} className="underline text-blue-600">click here</a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}