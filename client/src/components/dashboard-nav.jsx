import React from 'react';
import { Link } from 'react-router-dom';
import CreateClub from './create-club.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

class DashNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false,
      modal: false
    }
  }

  logout() {
    this.props.logout();
    console.log('logged out');
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
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
              <Link to="/dashboard" className="nav-link" onClick={this.toggleModal.bind(this)}>Create a club</Link>
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
      <CreateClub
      modal={this.state.modal}
      toggleModal={this.toggleModal.bind(this)}
      createNewClub={this.props.createNewClub}
      />
      </div>
    );
  }
}

export default DashNav;