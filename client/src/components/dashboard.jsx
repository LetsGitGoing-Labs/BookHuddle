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
    const match = this.props.match;
    return (
      <div>
        <DashNav />
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
        <Route path={`${match.url}/create-club`} component={ CreateClub } />
        <Route path={`${match.url}/profile`} component={ Profile } />
      </div>
    );
  }
}

export default Dashboard;
