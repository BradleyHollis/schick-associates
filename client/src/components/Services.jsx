const SERVICES = [
  "Financial Modeling",
  "Pitch Materials",
  "Find Buyers & Partners",
  "Competitive Bidding Process",
  "Maximizing Value",
  "Deal Execution",
];

export default function ServicesGrid() {
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