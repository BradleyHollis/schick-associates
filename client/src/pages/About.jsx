import Page from '../components/Page';

export default function About() {
  return (
    <Page
      title="About"
      intro="Schick & Associates is a small, friendly studio focused on clarity and results. We pair good fundamentals with pragmatic engineering to ship quickly and iterate."
      align="center"
    >
      <div className="card">
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
    </Page>
  );
}
