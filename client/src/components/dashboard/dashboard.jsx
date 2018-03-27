import React from 'react';
import $ from 'jquery';
import { Route, Link, Redirect } from 'react-router-dom';

import MeetingsPanel from './panel-meetings.jsx';
import ClubsPanel from './panel-clubs.jsx';
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
    const index = this.state.index;
     return (
      <div id="dashboard" className="col-md-9">
        <MeetingsPanel meetings={this.state.meetings}/>
        <ClubsPanel clubs={this.props.clubs}/>
          <div id="books-list" className="content-wrapper">
           { /*BookList*/
              (!this.state.books || this.state.books.length === 0) ?
              (
                <div>
                  <h3>Recommended Books</h3>
                  <div>No recommendations yet!</div>
                </div>
              ) : (
                <div>
                  <h3>Recommended Books:</h3>
                  <div className="row">
                    {this.state.books.map((book, i) =>
                      (
                        <div className="col-md-4">
                          <a key={i} href={book.book_url} target='blank'>
                            <img className="book-cover" src={book.book_image[0]}/>
                            <p>{book.book_title[0].slice(0, 30)}</p>
                          </a>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            }
          </div>
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