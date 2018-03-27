import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
// styles

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
        <div className="row">
        <Sidebar />

        <Switch>
          <Route path='/dashboard/create-club' component={ CreateClub } />
          <Route path='/dashboard/:clubId' render={
            (props) => ( <Club {...props} clubs={this.state.clubs}/>)
          } />
          <Route render={(props) => {
          return <Dashboard user={this.props.user} clubs={this.state.clubs}/>
         } } />
        </Switch>
      </div>
      </div>
    );
  }
}

export default DashboardRouting;