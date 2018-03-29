import React from 'react';
import $ from 'jquery';
import { Route, Link, Redirect } from 'react-router-dom';

//stylesheets
import '../../styles/dashboard.css';

//components
import SearchResultsPanel from './panel-search-results.jsx';
import MeetingsPanel from './panel-meetings.jsx';
import ClubsPanel from './panel-clubs.jsx';
import SuggestedPanel from './panel-suggested.jsx';
import Club from '../clubs/club.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      upcomingMeetings: [],
      index: ''
    };
  }

  componentDidMount() {
    this.getBooks();
    this.getMeetings();
    this.getNearClubs();
  }

  getBooks() {
    var searchTerm = 'Harry Potter';

    var query = `mutation GetBooksAPI($searchTerm: String) {
      getBooksAPI(searchBy: $searchTerm)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query: query,
        variables: { searchTerm: searchTerm }
      }),
      success: (booksData) => {
        let books = JSON.parse(booksData.data.getBooksAPI).slice(0, 3);
        this.setState({
          books: books
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getMeetings() {
    let clubs = this.props.user.clubs;
    let meetings = [];
    clubs.map((club) => {
    meetings = meetings.concat(club.meetings);
    });
    meetings.sort((a,b) => {
      return a.meeting_date - a.meeting_date;
    });

    this.setState({
      upcomingMeetings: meetings
    });
  }

  getNearClubs() {
    var location = 'San Francisco, California';

    var query = `mutation GetNearClubs($location: String) {
      getNearClubs(clubLocation: $location)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query: query,
        variables: { location: location }
      }),
      success: (clubsData) => {
        let clubs = JSON.parse(clubsData.data.getNearClubs);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div id="dashboard" className="col-md-9">
        <SearchResultsPanel results={this.props.searchResults}/>
        <MeetingsPanel meetings={this.state.upcomingMeetings}/>
        <ClubsPanel clubs={this.props.user.clubs}/>
        <SuggestedPanel books={this.state.books}/>
      </div>
    )
  }
}

export default Dashboard;