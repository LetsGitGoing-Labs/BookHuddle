import React from 'react';
import $ from 'jquery';

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
    this.state = {
      books: []
    };

    this.componentDidMount = this. componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log(this.props.location.state);
    var component = this;
    $.ajax({
      type: 'GET',
      url: '/getBooksAPI',
      success: function(books) {
        component.setState({
          books: books
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
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
