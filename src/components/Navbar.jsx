import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <span className="logo-icon">☁</span>
        <span>AZ-900 Guide</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/concepts">Notions</NavLink>
        <NavLink to="/quiz">Quiz</NavLink>
        <NavLink to="/conseils">Conseils</NavLink>
        <NavLink to="/progression">Progression</NavLink>
        <NavLink to="/a-propos">À propos</NavLink>
      </div>

      <div className="navbar-spacer" />
    </nav>
  );
}

export default Navbar;