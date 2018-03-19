import React from 'react';
import { Link } from 'react-router-dom';

class MainNavbar extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-md navbar-light bg-light">
          <a class="navbar-brand" href="/">BookHuddle</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
              <Link to="/about" class="nav-link">Our Team</Link>
              </li>
              <li class="nav-item">
                <Link to="/faq" class="nav-link">FAQ</Link>
              </li>
              <li class="nav-item active">
                <Link to="/signup" class="nav-link">Signup</Link>
              </li>
              <li class="nav-item">
                <Link to="/login" class="nav-link">Login</Link>
              </li>
            </ul>
  </div>
</nav>
      </div>
    );
  }
}

export default MainNavbar;