import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
// styles

// components
import DashboardNavbar from './dashboard-navbar.jsx';
import Dashboard from './dashboard.jsx';
import Profile from './profile.jsx';
import CreateClub from './create-club.jsx';
import Club from './club.jsx';

class DashboardRouting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: [
        { id: 'jane-austin-book-club', title: 'Jane Austen Book Club', image: 'https://images-na.ssl-images-amazon.com/images/I/41uM9MBn1CL._SX326_BO1,204,203,200_.jpg' }
      ],
      selectedClub: ''
    }
  }

  render() {
    const context = this;
    return (
      <div>
        <DashboardNavbar />
        <hr />
        <Switch>
          <Route path='/dashboard/create-club' component={ CreateClub } />
          <Route path='/dashboard/profile' component={ Profile } />
          <Route path='/dashboard/:clubId' render={
            (props) => ( <Club {...props} clubs={this.state.clubs}/>)
          } />
          <Route render={(props) => {
          return <Dashboard user={this.props.user} clubs={this.state.clubs}/>
         } } />
        </Switch>
      </div>
    );
  }
}

export default DashboardRouting;