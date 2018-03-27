import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import DashboardNavbar from '../navigation/dashboard-navbar.jsx';
import Sidebar from '../navigation/sidebar.jsx';
import Dashboard from './dashboard.jsx';
import CreateClub from './create-club.jsx';
import Club from '../clubs/club.jsx';

class DashboardRouting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userTest: userData
    }
  }

  render() {
    return (
      <div>
        <DashboardNavbar />
        <div className="row">
          <Sidebar user={this.state.userTest}/>

          <Switch>
            <Route path='/dashboard/create-club' component={ CreateClub } />
            <Route path='/dashboard/:clubId' render={
              (props) => ( <Club {...props} clubs={this.state.userTest.clubs}/>)
            } />
            <Route render={(props) => {
            return <Dashboard user={this.state.userTest} />
           } } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default DashboardRouting;

const userData = {
  id:'1',
  email: 'jane@gmail.com',
  password: 'encrypted',
  first_name: 'Jane',
  last_name: 'Smith',
  location: 'New York, NY',
  profile_url: 'https://source.unsplash.com/aZm98bjnA20',
  clubs: [
    { id: 'jane-austin-book-club',
      club_name: 'Jane Austen Book Club',
      location: 'New York, NY',
      current_book_isbn: '0141439688',
      club_description: 'We love Jane Austen!',
      meetings: [
        {
          id: 1,
          meeting_date: '2018-04-30 21:00:00',
          meeting_host: 'joey@gamil.com',
          location: '123 Main Street, Houston, TX 12345',
          meeting_description: ' We\'ll be finishing our discussion of Persuasion.',
          meeting_details: 'Hey everyone! Same place as usual. It\'s Bob\'s turn to bring refreshments.  I\'ll email the discussion questions the day of.'
        }
      ],
      past_books: []
    }
  ]
}