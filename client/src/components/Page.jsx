export default function Page({ title, intro, children, narrow=false }) {
  return (
    <main className="page">
      <header className="page-header">
        <div className="container">
          <h1 className="page-title page-title--xl">{title}</h1>
          {intro && <p className="page-intro">{intro}</p>}
        </div>
      </header>

      <div className="page-body">
        <div className={narrow ? "container container--narrow" : "container"}>
          {children}
        </div>
      </div>
    </main>
  );
}