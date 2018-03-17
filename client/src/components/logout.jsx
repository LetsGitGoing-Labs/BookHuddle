import React from 'react';
import { Link } from 'react-router-dom';

class Logout extends React.Component {
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