const SERVICES = [
  { title: "Financial Modeling",          img: "/Financial_Modeling.png" },
  { title: "Pitch Materials",             img: "/Pitch_Materials.png" },
  { title: "Finding Buyers & Partners",      img: "/Finding%20Buyers%20and%20Partners.png" },
  { title: "Competitive Bidding Process", img: "/Competitive%20Bidding%20Process.png" },
  { title: "Maximizing Value",            img: "/Maximizing%20Value.png" },
  { title: "Deal Execution",              img: "/Deal%20Execution.png" },
];


export default function ServicesGrid({ items = SERVICES }) {
  return (
    <section className="section section--services section--alt">
      <div className="sa-container">
        <h2 className="title-serif title-xl">Services We Offer</h2>
        <p className="muted">A comprehensive suite to support clients at every stage.</p>

        <div className="services">
          {items.map(({ title, img }, idx) => (
            <article className="service" key={idx}>
              {/* use <img> for better LCP + alt text */}
              <img
                className="service-thumb"
                src={img}
                alt={title}
                loading={idx > 1 ? "lazy" : "eager"}   // eager for first couple
                width="96" height="96"                 // helps CLS
              />
              <div className="service-body">
                <div className="service-title serif">{title}</div>
                {/* optional: <p className="muted">Short description here.</p> */}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}