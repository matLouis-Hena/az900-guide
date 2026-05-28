import { NavLink } from 'react-router-dom';

function Navbar() {
  function handleNavigation(event) {
    const examInProgress = localStorage.getItem('examInProgress') === 'true';

    if (!examInProgress) {
      return;
    }

    const wantsToLeave = window.confirm(
      'Un examen blanc est en cours. Si tu quittes cette page, ta tentative sera abandonnée. Voulez-vous vraiment quitter ?'
    );

    if (!wantsToLeave) {
      event.preventDefault();
      return;
    }

    localStorage.removeItem('examInProgress');
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="logo" onClick={handleNavigation}>
        <span className="logo-icon">☁</span>
        <span>AZ-900 Guide</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" onClick={handleNavigation}>Accueil</NavLink>
        <NavLink to="/concepts" onClick={handleNavigation}>Notions</NavLink>
        <NavLink to="/quiz" onClick={handleNavigation}>Quiz</NavLink>
        <NavLink to="/conseils" onClick={handleNavigation}>Conseils</NavLink>
        <NavLink to="/progression" onClick={handleNavigation}>Progression</NavLink>
        <NavLink to="/a-propos" onClick={handleNavigation}>À propos</NavLink>
      </div>

      <div className="navbar-spacer" />
    </nav>
  );
}

export default Navbar;