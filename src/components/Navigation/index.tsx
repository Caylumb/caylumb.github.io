import { Link, useLocation } from 'react-router';
import './index.scss';

interface NavLink {
  path: string;
  label: string;
}

const navLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/home', label: 'Blog' },
  { path: '/projects/list', label: 'Projects' },
];

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <Link to="/" className="navigation__logo">
          <span className="navigation__logo-text">CB</span>
        </Link>

        <ul className="navigation__links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navigation__link ${
                  location.pathname === link.path ? 'navigation__link--active' : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
