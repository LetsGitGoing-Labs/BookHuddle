import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <Link to='/dashboard'>
          <button>Login</button>
        </Link>
      </div>
    );
  }
}

export default Login;