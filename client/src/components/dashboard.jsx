import React from 'react';
import $ from 'jquery';
import { Route, Link, Redirect } from 'react-router-dom';

import Profile from './profile.jsx';
import MeetingList from './meeting-list-dashboard.jsx';
import BookListDashboard from './book-list-dashboard.jsx';
import YourClubListDashboard from './your-club-list-dashboard.jsx';
import DashNav from './dashboard-nav.jsx';
import Club from './club.jsx';
import '../styles/main.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      meetings: meetings,
      index: ''
    };
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    let context = this;
    $.ajax({
      type: 'GET',
      url: '/getBooksAPI',
      success: function(books) {
        context.setState({
          books: books
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  handleCreateClub(formData) {
    $.ajax({
      type: 'POST',
      url: '/clubs',
      data: formData,
      success: (data) => {
        console.log(data.confirmRequest)
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  renderClubPage(e) {
    this.setState({
      index: e.target.id,
      clubRedirect: true
    });
  }

  onCreateClubClick() {
    this.setState({
      createClubRedirect: true
    });
  }

  render() {
    const index = this.state.index;
     return (
      <div>
        <h1>{this.props.user.first_name}'s Dashboard</h1>
        <MeetingList meetingList= {this.state.meetings}/>
        <YourClubListDashboard renderClub= {this.renderClubPage.bind(this)} yourClubList={this.state.clubs}/>
        <BookListDashboard onBookClick = {this.onBookClick} bookList={this.state.books}/>
      </div>
    )
  }
}

export default Dashboard;

const meetings = [
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
      ]