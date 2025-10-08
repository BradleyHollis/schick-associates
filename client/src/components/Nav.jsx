import { NavLink } from 'react-router-dom';

const linkStyle = ({ isActive }) => ({
  opacity: isActive ? 1 : 0.75,
});

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container nav__row">
        <div className="logo">Schick &amp; Associates</div>

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
