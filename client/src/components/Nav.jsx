import { NavLink } from 'react-router-dom';

/*
const linkStyle = ({ isActive }) => ({
  opacity: isActive ? 1 : 0.75,
});
*/
const linkStyle = ({ isActive }) => ({
  color: isActive ? "#333" : "#777", // dark gray when active, lighter gray otherwise
  textDecoration: isActive ? "underline" : "none", // underline only when active
});
export default function Nav() {
  return (
    <nav className="nav">
      <div className="container nav__row">
        <div className="logo">
          <img src="/Schick Logo.png" alt="Schick & Associates" className="logo-img" />
        </div>

        {/* This wrapper is required so gap/align rules take effect */}
        <div className="nav__links">
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/work" style={linkStyle}>Work</NavLink>
          <NavLink to="/services" style={linkStyle}>Services</NavLink>
          <NavLink to="/about" style={linkStyle}>About</NavLink>
          <NavLink to="/contact" style={linkStyle}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}
