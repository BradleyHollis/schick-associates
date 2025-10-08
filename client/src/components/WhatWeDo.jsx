export default function WhatWeDo(){
  return (
    <section className="section section--what">
      <div className="sa-container what-grid">
        <div className="panel-media" 
          style={{ backgroundImage: 'url(/Deal.jpg)' }}  // <-- use your new image
          role="img"
          aria-label="Handshake closing a deal"
        />
        <div className="panel-copy">
          <h2 className="title-serif title-2xl">What We Do</h2>
          <p>We are a trusted, comprehensive end-to-end advisor. From the moment we kick-off and start building pitch materials to the time the ink is wet on the purchase agreement, we are with you every step of the way.</p>
          <a className="btn btn--light" href="/about">Learn More About Us</a>
        </div>
      </div>
    </section>
  );
  }