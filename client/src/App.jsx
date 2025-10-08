
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Work from "./pages/Work.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import '../styles/foundation.css'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
