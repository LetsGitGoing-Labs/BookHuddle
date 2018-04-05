import React from 'react';
import { Link } from 'react-router-dom';

import DashboardSearchbar from '../dashboard/DashboardSearchbar';

import '../../styles/dashboard.css';

class DashboardNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link to="/" className="navbar-brand">BookHuddle</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li><DashboardSearchbar search={this.props.search} /></li>
              <li className="nav-item"><Link to="/dashboard">My Dashboard</Link></li>
              <li className="nav-item"><Link to="/logout">Logout</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default DashboardNavbar;
