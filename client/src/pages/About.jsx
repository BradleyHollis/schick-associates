// client/src/pages/About.jsx
import Page from '../components/Page';

const TOMBSTONES = [
  { src: "/ai_hvac.png", alt: "AI HVAC transaction" },
  { src: "/manufacturing_co.png", alt: "Manufacturing Company transaction" },
  { src: "/behavioral_health_center.png", alt: "Behavioral Health Center transaction" },
  { src: "/mental_health_co.png", alt: "Mental Health Company transaction" },
  { src: "/dental_practice.png", alt: "Dental Practice transaction" },
  { src: "/healthcare_services.png", alt: "Healthcare Services transaction" },
];

export default function About() {
  return (
    <Page title="About" align="center" intro="">
      <div className="card about-copy">
        <p>
          We help founders and owners navigate key milestones with confidence—from positioning
          and materials to outreach and negotiation. Our approach blends white-shoe experience
          with Midwest roots for better processes and outcomes.
        </p>
        <p>
          The result is clear communication, disciplined execution, and a focus on maximizing
          value while preserving certainty of close.
        </p>
      </div>

      {/* Callouts */}
      <section className="about_callouts container" aria-label="Firm Highlights">
        <div className="callout">
          <div className="callout_icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M10 4h4a2 2 0 0 1 2 2v1h3a3 3 0 0 1 3 3v3H2V10a3 3 0 0 1 3-3h3V6a2 2 0 0 1 2-2zm4 3V6a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1zM2 14h22v4a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z"/>
            </svg>
          </div>
          <div className="callout_text">
            <div className="callout_value">$250M+</div>
            <div className="callout_label">Total Deal Value</div>
          </div>
        </div>

        <div className="callout">
          <div className="callout_icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M3 11h4v10H3zM10 7h4v14h-4zM17 3h4v18h-4z"/>
            </svg>
          </div>
          <div className="callout_text">
            <div className="callout_value">20+</div>
            <div className="callout_label">Total Deals</div>
          </div>
        </div>
      </section>

      {/* Select Transactions */}
      <section className="container about_select" aria-labelledby="select-transactions">
        <h2 id="select-transactions" className="title-font about_select_title">Select Transactions</h2>
        <div className="tombstone_grid">
          {TOMBSTONES.map((t, i) => (
            <figure key={i} className="tombstone">
              <img src={t.src} alt={t.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* Notable Features */}
      <section className="container about_press" aria-labelledby="press-mentions">
        <h2 id="press-mentions" className="title-font about_press_title">Notable Features</h2>

        <div className="press_grid">
          {/* St. Louis Post-Dispatch — use IMG like BJ, with gentle constraints so full wordmark shows */}
          <a
            href="https://www.stltoday.com/news/local/business/article_9cc5ea58-ee66-11ef-9aa1-1b7cb7884ea4.html"
            target="_blank"
            rel="noopener noreferrer"
            className="press_card press_card--stl"
            aria-label="Read on St. Louis Post-Dispatch"
          >
            <div className="press_logo_wrap press_logo_wrap--stl">
            <img
                src="/stl_post_dispatch_logo.png"
                alt="St. Louis Post-Dispatch logo"
                className="press_logo press_logo--stl"
                width={1200}            // approximate intrinsic width of your source
                height={400}            // approximate intrinsic height of your source
                decoding="async"
                fetchpriority="low"
                loading="lazy"
              />
            </div>
            <div className="press_body">
              <div className="press_source">St. Louis Post-Dispatch</div>
              <h3 className="press_title">
                Developers submit competing proposal for the Millennium Hotel site
              </h3>
              <span className="press_cta">Read article →</span>
            </div>
          </a>

          {/* St. Louis Business Journal */}
          <a
            href="https://www.bizjournals.com/stlouis/news/2025/02/21/millennium-hotel-downtown-st-louis-competing-bid.html"
            target="_blank"
            rel="noopener noreferrer"
            className="press_card"
            aria-label="Read on St. Louis Business Journal"
          >
            <div className="press_logo_wrap">
            <img
              src="/stl_biz_journal_logo.png"
              alt="St. Louis Business Journal logo"
              className="press_logo"
              width={1200}
              height={400}
              decoding="async"
              fetchpriority="low"
              loading="lazy"
            />
            </div>
            <div className="press_body">
              <div className="press_source">St. Louis Business Journal</div>
              <h3 className="press_title">
                Competing bid emerges for downtown Millennium Hotel redevelopment
              </h3>
              <span className="press_cta">Read article →</span>
            </div>
          </a>
        </div>
      </section>
    </Page>
  );
}
