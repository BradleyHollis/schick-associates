// src/pages/Page.jsx
export default function Page({ title, intro, align = "left", children }) {
  const alignClass = align === "center" ? "center" : "";
  return (
    <main className={`page ${alignClass}`}>
      <header className="page__header">
        <div className="container page__header_wrap">
          {title && <h1 className="page__title title-font">{title}</h1>}
          {intro && <p className="page__intro">{intro}</p>}
        </div>
      </header>

      <div className="page__body">
        <div className="container">{children}</div>
      </div>
    </main>
  );
}
