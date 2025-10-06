const items = [
  { title:"ACME Logistics", tag:"Website", img:"/placeholder-1.jpg" },
  { title:"Rogers & Co", tag:"Brand + Site", img:"/placeholder-2.jpg" },
  { title:"Marina Dental", tag:"Landing", img:"/placeholder-3.jpg" },
  { title:"Blue Spruce", tag:"E-com Lite", img:"/placeholder-4.jpg" },
  { title:"Northline", tag:"Rebrand", img:"/placeholder-5.jpg" },
  { title:"Holdfast", tag:"Microsite", img:"/placeholder-6.jpg" },
];

export default function Work(){
  return (
    <section className="section container">
      <h2 style={{fontSize:36, marginBottom:12}}>Selected work</h2>
      <div className="hr"></div>
      <div className="grid" style={{marginTop:14}}>
        {items.map((x,i)=>(
          <article className="card" key={i}>
            <div className="card__media"></div>
            <div className="card__body">
              <div className="card__kicker">{x.tag}</div>
              <div className="card__title">{x.title}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
