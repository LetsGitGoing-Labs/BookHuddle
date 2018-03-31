import React from 'react';
import $ from 'jquery';
import { Route, Link, Redirect } from 'react-router-dom';

// stylesheets
import '../../styles/dashboard.css';

// components
import SearchResultsPanel from './panel-search-results.jsx';
import MeetingsPanel from './panel-meetings.jsx';
import ClubsPanel from './panel-clubs.jsx';
import SuggestedPanel from './panel-suggested.jsx';
import Club from '../clubs/club.jsx';
import ClubsNearYouPanel from './panel-clubs-near-you.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      upcomingMeetings: [],
      clubs: [],
      index: '',
    };
  }

  componentDidMount() {
    this.getBooks();
    this.getMeetings();
    this.getNearClubs();
  }

  getBooks() {
    const searchTerm = 'Historical Fiction';

    const query = `mutation GetBooksAPI($searchTerm: String) {
      getBooksAPI(searchBy: $searchTerm)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: { searchTerm },
      }),
      success: (booksData) => {
        const books = JSON.parse(booksData.data.getBooksAPI).slice(0, 3);
        this.setState({
          books,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getMeetings() {
    const clubs = this.props.user.clubs;
    let meetings = [];
    clubs.map((club) => {
      meetings = meetings.concat(club.meetings);
    });
    meetings.sort((a, b) => a.meeting_date - a.meeting_date);

    this.setState({
      upcomingMeetings: meetings,
    });
  }

  getNearClubs() {
    const location = 'San Francisco, California';

    const query = `mutation GetNearClubs($location: String) {
      getNearClubs(clubLocation: $location)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: { location },
      }),
      success: (clubsData) => {
        clubsData = JSON.parse(clubsData.data.getNearClubs);
        this.setState({
          clubs: clubsData,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  render() {
    return (
      <div id="dashboard" className="col-md-9">
        <SearchResultsPanel results={this.props.searchResults} />
        <MeetingsPanel clubs={this.props.user.clubs} />
        <ClubsPanel clubs={this.props.user.clubs} />
        <ClubsNearYouPanel clubs={this.state.clubs} />
        <SuggestedPanel books={this.state.books} />
      </div>
    );
  }
}

export default Dashboard;
