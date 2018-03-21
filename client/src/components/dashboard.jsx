import React from 'react';
import { Route, Link } from 'react-router-dom';
import CreateClub from './create-club.jsx';
import Profile from './profile.jsx';
import MeetingListDashboard from './meeting-list-dashboard.jsx';
import BookListDashboard from './book-list-dashboard.jsx';
import ClubListDashboard from './clubs-list-dashboard.jsx';
import DashNav from './dashboard-nav.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DashNav />
        <h1>Welcome to your dashboard!</h1>
        <ul>
          <li><Link to='/create-club'>Create a Club</Link></li>
          <li><Link to='/profile'>View Profile</Link></li>
          <li><Link to='/logout'>Logout</Link></li>
        </ul>
        <p></p>
        <div>
          <MeetingListDashboard/>
        </div>
        <p></p>
        <div>
          <ClubListDashboard/>
        </div>
        <p></p>
        <div>
          <BookListDashboard/>
        </div>
        <Route path='/create-club' component={ CreateClub } />
        <Route path='/profile' component={ Profile } />
      </div>
    );
  }
}

export default Dashboard;
