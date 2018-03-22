import React from 'react';
import $ from 'jquery';

import { Route, Link, Redirect } from 'react-router-dom';
import CreateClub from './create-club.jsx';
import Profile from './profile.jsx';
import MeetingListDashboard from './meeting-list-dashboard.jsx';
import BookListDashboard from './book-list-dashboard.jsx';
import ClubListDashboard from './clubs-list-dashboard.jsx';
import YourClubListDashboard from './your-club-list-dashboard.jsx';
import DashNav from './dashboard-nav.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      clubs: [
        { title: 'Jane Austen Book Club' }
      ],
      clickedClub: '',
      clubRedirect: false
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onYourClubClick = this.onYourClubClick.bind(this);
  }

  componentDidMount() {
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

  onYourClubClick() {
    this.setState({
      clubRedirect: true
    });
  }


  render() {
    if (this.state.clubRedirect) {
      return (
          <Redirect to= {{
            pathname: '/club',
            state: { clickedClub: this.state.clickedClub }
            }} />)
    }
    return (
      <div>
        <DashNav />
        <h1>{this.props.location.state.userResponseData[0].first_name + "'s Dashboard"}</h1>
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
          <YourClubListDashboard onYourClubClick = {this.onYourClubClick} yourClubList={this.state.clubs}/>
        </div>
        <p></p>
        <div>
          <BookListDashboard/>
        </div>
        <p></p>
        <div>
          <ClubListDashboard/>
        </div>
        <Route path='/create-club' component={ CreateClub } />
        <Route path='/profile' component={ Profile } />
      </div>
    );
  }
}

export default Dashboard;
