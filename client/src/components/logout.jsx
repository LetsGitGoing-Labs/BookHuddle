import React from 'react';
import { Link } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.handleLogout();
  }

  render() {
    return (
      <div>
        <h3>You've successfully logged out.</h3>
        <Link to='/'>
          <button>Home</button>
        </Link>
      </div>
    );
  }
}

export default Logout;