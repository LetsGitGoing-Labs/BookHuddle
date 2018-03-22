import React from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './login-modal.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeTab: ''
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleModal(e) {
    const activeTab = e.target.name ? e.target.name : null;
    this.setState({
      activeTab: activeTab,
      modal: !this.state.modal
    });
  }

  toggleTab(tab) {
    this.setState({
      activeTab: tab
    })
  }

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
                <Link to="" name='signup' className="nav-link" onClick={this.toggleModal}>Signup</Link>
              </li>
              <li className="nav-item">
                <Link to="" name='login' className="nav-link" onClick={this.toggleModal}>Login</Link>
              </li>
            </ul>
  </div>
</nav>
        <LoginModal
          modal={this.state.modal}
          activeTab={this.state.activeTab}
          toggleTab={this.toggleTab}
          toggleModal={this.toggleModal}
          login={this.props.login}
          isLoggedIn={this.props.isLoggedIn}
        />
      </div>
    );
  }
}

export default MainNavbar;