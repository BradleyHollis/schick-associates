import "../styles/schick.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App(){
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/work" element={<Work/>} />
        <Route path="/services" element={<ServicesPage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
      <footer className="footer">
        © {new Date().getFullYear()} Schick & Associates • Making Friends is our Business
      </footer>
    </BrowserRouter>
  );
}
