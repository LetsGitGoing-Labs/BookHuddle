import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

class MainNavbar extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link to='/' className="navbar-brand">BookHuddle</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <Link to="/about" className="nav-link">Our Team</Link>
              </li>
              <li className="nav-item">
                <Link to="/faq" className="nav-link">FAQ</Link>
              </li>
              <li className="nav-item active">
                <Link to="/login-modal" className="nav-link">Signup</Link>
              </li>
              <li className="nav-item">
                <Link to="/login-modal" className="nav-link">Login</Link>
              </li>
            </ul>
  </div>
</nav>
      </div>
    );
  }
}

export default MainNavbar;