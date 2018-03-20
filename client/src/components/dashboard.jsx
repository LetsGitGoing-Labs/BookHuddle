import React from 'react';
import { Route, Link } from 'react-router-dom';
import CreateClub from './create-club.jsx';
import Profile from './profile.jsx';
import MeetingListDashboard from './meeting-list-dashboard.jsx';
import BookListDashboard from './book-list-dashboard.jsx';
import ClubListDashboard from './clubs-list-dashboard.jsx';

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
        <div>
          <MeetingListDashboard/>
        </div>
        <div>
          <ClubListDashboard/>
        </div>
        <div>
          <BookListDashboard/>
        </div>
        <Route path={`${match.url}/create-club`} component={ CreateClub } />
        <Route path={`${match.url}/profile`} component={ Profile } />
      </div>
    );
  }
}

export default Dashboard;
