import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

class DashNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false
    }
  }

  logout() {
    this.props.logout();
    console.log('logged out');
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md dash-nav">
          <Link to='/' className="navbar-brand">BookHuddle</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
              <Link to="/create-club" className="nav-link">Create a club</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              <li className="nav-item active">
                <Link to="/logout" className="nav-link" onClick={this.logout.bind(this)}>Logout</Link>
              </li>
            </ul>
  </div>
</nav>
      </div>
    );
  }
}

export default DashNav;