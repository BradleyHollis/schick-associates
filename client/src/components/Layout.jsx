// src/components/Layout.jsx
import { Outlet } from "react-router-dom";
import Nav from "./Nav.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  return (
    <>

    <div className="site">
      <Nav />
      <main className="site_main">
        {/* All pages render here */}
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  );
}