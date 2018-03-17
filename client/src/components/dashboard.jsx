import React from 'react';
import { Route, Link } from 'react-router-dom';
import CreateClub from './create-club.jsx';
import Profile from './profile.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const match = this.props.match;
    return (
      <div>
        <h1>Welcome to your dashboard!</h1>
        <ul>
          <li><Link to={`${match.url}/create-club`}>Create a Club</Link></li>
          <li><Link to={`${match.url}/profile`}>View Profile</Link></li>
          <li><Link to='/logout'>Logout</Link></li>
        </ul>

        <Route path={`${match.url}/create-club`} component={ CreateClub } />
        <Route path={`${match.url}/profile`} component={ Profile } />
      </div>
    );
  }
}

export default Dashboard;