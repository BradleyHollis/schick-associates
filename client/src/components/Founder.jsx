export default function Founder(){
  return (
    <section className="section">
      <div className="sa-container founder">
        <div className="founder-copy">
          <h2 className="title-serif title-lg">Meet Evan</h2>
          <p>
            Evan brings a unique blend of Wall Street experience and Midwestern sensibility to every transaction. 
            Having spent years in mergers and acquisitions on Wall Street, he’s been part of some of the most notable deals in the market. 
            Today, through Schick & Associates, Evan applies that same expertise to help business owners across industries connect with 
            the right buyers, negotiate with confidence, and close deals that create lasting value for all parties involved. Known for 
            his steady demeanor and straightforward approach, Evan is as relatable as he is strategic—committed to guiding clients 
            through the complexities of the deal process with integrity, clarity, and genuine care.
          </p>
          <a className="btn btn--ghost" href="/about">Read More</a>
        </div>
        <div className="founder-photo"           
          style={{ backgroundImage: 'url(/founder.png)' }}  // <-- use your new image
          role="img"
          aria-label="Handshake closing a deal" />
      </div>
    </section>
  );
  }