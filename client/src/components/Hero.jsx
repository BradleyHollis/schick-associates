export default function Hero(){
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