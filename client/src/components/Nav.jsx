import { NavLink } from "react-router-dom";

const link = ({isActive})=>({opacity:isActive?1:.75});
export default function Nav(){
  return (
    <nav className="nav">
      <div className="container nav__row">
        <div className="logo">Schick & Associates</div>
        <div className="nav__links">
          <NavLink to="/" style={link} end>Home</NavLink>
          <NavLink to="/work" style={link}>Work</NavLink>
          <NavLink to="/services" style={link}>Services</NavLink>
          <NavLink to="/about" style={link}>About</NavLink>
          <NavLink to="/contact" style={link}>Contact</NavLink>
        </div>
      </div>
    </nav>
  );
}
