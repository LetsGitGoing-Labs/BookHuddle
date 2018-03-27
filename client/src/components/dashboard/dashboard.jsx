import React from 'react';
import $ from 'jquery';
import { Route, Link, Redirect } from 'react-router-dom';

import MeetingsPanel from './panel-meetings.jsx';
import ClubsPanel from './panel-clubs.jsx';
import SuggestedPanel from './panel-suggested.jsx';
import Club from '../clubs/club.jsx';


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
      data: { searchTerm: 'Jane Austen' },
      success: function(books) {
        context.setState({
          books: books.slice(0,3)
        });
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div id="dashboard" className="col-md-9">
        <MeetingsPanel meetings={this.state.meetings}/>
        <ClubsPanel clubs={this.props.clubs}/>
        <SuggestedPanel books={this.state.books}/>
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
      }
      ]