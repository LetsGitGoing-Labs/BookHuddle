import React from 'react';
import { Route, Link } from 'react-router-dom';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>BookHuddle</h1>
        <ul>
          <li><Link to='/about'>Our Team</Link></li>
          <li><Link to='/faq'>FAQ</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/test'>Login</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;