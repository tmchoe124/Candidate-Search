import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const currentPage = useLocation().pathname;

  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            to="/"
            className={`nav-link ${currentPage === '/' ? 'active' : ''}`}
          >
            HOME
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/SavedCandidates"
            className={`nav-link ${
              currentPage === '/SavedCandidates' ? 'active' : ''
            }`}
          >
            POTENTIAL CANDIDATES
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;