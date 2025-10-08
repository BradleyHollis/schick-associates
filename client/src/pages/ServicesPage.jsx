// src/pages/ServicesPage.jsx
import Page from "../components/Page";

export default function ServicesPage() {
  return (
    <Page title="Services" align="left">
      <ul style={{ lineHeight: 1.9, maxWidth: 760 }}>
        <li>
          <strong>Websites &amp; Landing Pages</strong> — modern, fast, SEO-aware.
        </li>
        <li>
          <strong>Brand &amp; Identity</strong> — lean systems, robust in practice.
        </li>
        <li>
          <strong>Integrations</strong> — forms, email, payments, analytics.
        </li>
      </ul>
    </Page>
  );
}
