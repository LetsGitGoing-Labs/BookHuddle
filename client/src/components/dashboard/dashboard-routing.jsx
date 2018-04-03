import React from 'react';
import { Route, Switch } from 'react-router-dom';

// components
import DashboardNavbar from '../navigation/dashboard-navbar.jsx';
import Sidebar from '../navigation/sidebar.jsx';
import Dashboard from './dashboard.jsx';
import CreateClub from './create-club.jsx';
import Club from '../clubs/club.jsx';
import Meeting from '../meetings/meeting.jsx';

class DashboardRouting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
    this.search = this.search.bind(this);
  }

  search(searchTerm) {
    const query = `mutation getClubsByName($searchTerm: String) {
      getClubsByName(clubName: $searchTerm)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: { searchTerm },
      }),
      success: (clubsData) => {
        clubsData = JSON.parse(clubsData.data.getClubsByName);
        this.setState({
          searchResults: clubsData,
        });
      },
      error: (err) => {
        console.log(`${err}This was the error`);
      },
    });
  }

  render() {
    return (
      <div>
        <DashboardNavbar search={this.search} />
        <div className="row">
          <Sidebar user={this.props.user} />

          <Switch>
            <Route
              path="/dashboard/create-club"
              render={
              props => <CreateClub {...props} userID={this.props.user.id} />
              }
            />

            <Route
              path="/dashboard/:meetingId"
              render={
              props => (<Meeting {...props} clubs={this.props.user.clubs} searchResults={this.state.searchResults} />)
              }
            />
            <Route
              path="/dashboard/:clubId"
              render={
              props => (<Club {...props} clubs={this.props.user.clubs} searchResults={this.state.searchResults} user={this.props.user} />)
            }
            />
            <Route render={props => <Dashboard user={this.props.user} searchResults={this.state.searchResults} getUserData={this.props.getUserData} />} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default DashboardRouting;