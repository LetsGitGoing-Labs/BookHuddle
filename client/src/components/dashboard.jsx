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
import '../styles/main.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      clubs: [
        { title: 'Jane Austen Book Club', image: 'https://images-na.ssl-images-amazon.com/images/I/41uM9MBn1CL._SX326_BO1,204,203,200_.jpg' }
      ],
      meetings: [
      {
        id: 1,
        meeting_date: 'March 30th, 2018',
        meeting_time: '7:30 PM',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: '123 Main Street, Houston, TX 12345',
        meeting_notes: 'Hey everyone! Same place as usual.  We\'ll be finishing our discussion of Persuasion.  It\'s Bob\'s turn to bring refreshments.  I\'ll email the discussion questions the day of.',
        meeting_book: {
          amazon_id: null,
          title: 'Persuasion',
          author: 'Jane Austen',
          imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41uM9MBn1CL._SX326_BO1,204,203,200_.jpg'
        }
      },
      {
        id: 2,
        meeting_date: 'April 1st, 2018',
        meeting_time: '7:30 PM',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: '123 Main Street, Houston, TX 12345',
        meeting_notes: 'Next month we\'re reading Sense and Sensibility.  Amy and Stan are bringing refreshments.',
        meeting_book: {
          amazon_id: null,
          title: 'Sense and Sensibility',
          author: 'Jane Austen',
          imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/414hu6Q4xFL._SX324_BO1,204,203,200_.jpg'
        }
      },
      {
        id: 3,
        meeting_date: 'May 3rd, 2018',
        meeting_time: '10 am',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: 'TBD',
        meeting_notes: 'For May we need someone to volunteer to host the meeting.  We\'ll be done with Persuasion, Thinking of reading .',
        meeting_book: {
          amazon_id: null,
          title: 'Mansfield park',
          author: 'Jane Austen',
          imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41jTnx6I%2BbL._SX324_BO1,204,203,200_.jpg'
        }
      }
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
        <DashNav logout={this.props.logout}/>
         <h1>{this.props.user.first_name}'s Dashboard</h1>
        <p></p>
        <div>
          <MeetingListDashboard meetingList= {this.state.meetings}/>
        </div>
        <p></p>
        <div>
          <YourClubListDashboard onYourClubClick = {this.onYourClubClick} yourClubList={this.state.clubs}/>
        </div>
        <p></p>
        <div>
          <BookListDashboard onBookClick = {this.onBookClick} bookList={this.state.books}/>
        </div>
        <p></p>
        <div>
          {/*<ClubListDashboard/>*/}
        </div>
        <Route path='/create-club' component={ CreateClub } />
        <Route path='/profile' component={ Profile } />
      </div>
    );
  }
}

export default Dashboard;
