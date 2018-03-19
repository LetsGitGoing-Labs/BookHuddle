import React from 'react';
import { Link } from 'react-router-dom';

class MainNavbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <a className="navbar-brand" href="/">BookHuddle</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
              <Link to="/about" className="nav-link">Our Team</Link>
              </li>
              <li className="nav-item">
                <Link to="/faq" className="nav-link">FAQ</Link>
              </li>
              <li className="nav-item active">
                <Link to="/signup" className="nav-link">Signup</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
  </div>
</nav>
      </div>
    );
  }
}

export default MainNavbar;