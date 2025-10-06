// client/src/pages/Home.jsx
import "./home.css";           // optional, if you created it
import { useEffect, useState } from "react";
import {sendMessage} from "../lib/api";

  function Hero(){
    return (
      <>
        <section id="hero" className="section section--hero">
          <div className="sa-container">
            <h1 className="title-font">Schick &amp; Associates</h1>
            <p>
                We have negotiated over <strong>$500 million</strong> in proceeds for owners.
                We advocate for business owners and stand firm as a trusted advisor throughout the transaction process.
                Whether selling a business, making strategic acquisitions, or seeking growth capital, we’re here to help.
                With white-shoe experience and Midwest roots, we deliver better processes and outcomes
            </p>
            <a className="btn btn--accent" href="/contact">Schedule a Consultation</a>
          </div>
          <div className="hero__bg" />
        </section>
      </>
    );
  }

  /* --------------------- What We do (dark split) -------------------------------------*/

  function WhatWeDo(){
  return (
    <section className="section section--what">
      <div className="sa-container what-grid">
        <div className="panel-media" />
        <div className="panel-copy">
          <h2 className="title-serif title-2xl">What We Do</h2>
          <p>We are a trusted, comprehensive end-to-end advisor. From the moment we kick-off and start the building pitch materials to the time the ink is wet on the purchase agreement, we are with you every step of the way.</p>
          <a className="btn btn--light" href="/about">Learn More About Us</a>
        </div>
      </div>
    </section>
  );
  }

  /* -------------------- Services Grid ------------------------------ */
const SERVICES = [
  "Financial Modeling",
  "Pitch Materials",
  "Find Buyers & Partners",
  "Competitive Bidding Process",
  "Maximizing Value",
  "Deal Execution",
];

function ServicesGrid() {
  const items = Array.isArray(SERVICES) ? SERVICES : [];
  return (
    <section className="section section--alt">
      <div className="sa-container">
        <h2 className="title-serif title-xl">Services We Offer</h2>
        <p className="muted">A comprehensive suite to support clients at every stage.</p>

        <div className="services">
          {items.map((title, idx) => (
            
            <article className="service" key={idx}>
              <div className="service-icon" />
              <div className="service-title.serif">{title}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


  function CTA() {
  return (
    <section className="band">
      <div className="sa-container band-row">
        <h3 className="title-serif title-lg">Contact us today to learn how we can support you on your journey.</h3>
        <a className="btn btn--light" href="/contact">Schedule Your Consultation</a>
      </div>
    </section>
  );
  }

  function Founder(){
  return (
    <section className="section">
      <div className="sa-container founder">
        <div className="founder-copy">
          <h2 className="title-serif title-lg">Meet Evan</h2>
          <p>
            Evan is an experienced lover with lots to give. 
          </p>
          <a className="btn btn--ghost" href="/about">Read More</a>
        </div>
        <div className="founder-photo" />
      </div>
    </section>
  );
  }

function Signup() {
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
        <h2 className="title-serif title-lg">Sign up for more info</h2>
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
          <div className="captcha">CAPTCHA</div>
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

export default function Home() {
  useEffect(() => console.log("Home mounted"), []);
  return (
    <>
      <Hero/>
      <WhatWeDo/>
      <ServicesGrid/>
      <CTA />
      <Founder />
      <Signup />
    </>
  );
}