// src/pages/Work.jsx
import Page from "../components/Page";

export default function Work() {
  const items = [
    { title: "ACME Logistics", tag: "Website" },
    { title: "Rogers & Co", tag: "Brand + Site" },
    { title: "Marina Dental", tag: "Landing" },
    { title: "Blue Spruce", tag: "E-Com Lite" },
    { title: "Northline", tag: "Rebrand" },
    { title: "Holdfast", tag: "Microsite" },
  ];

  return (
    <Page title="Selected work" align="center">
      <div className="grid">
        {items.map((x, i) => (
          <article key={i} className="card">
            <div className="card__media" />
            <div className="card__body">
              <div className="card__kicker">{x.tag}</div>
              <div className="card__title">{x.title}</div>
            </div>
          </article>
        ))}
      </div>
    </Page>
  );
}
