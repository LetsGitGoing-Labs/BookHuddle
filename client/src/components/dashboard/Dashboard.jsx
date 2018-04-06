import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom';

// stylesheets
import '../../styles/dashboard.css';

// components
import SearchResultsPanel from './SearchResultsPanel';
import MeetingsPanel from './MeetingsPanel';
import ClubsPanel from './ClubsPanel';
import SuggestedBooksPanel from './SuggestedBooksPanel';

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
    this.props.getUserData(this.props.user.email);
    this.getBooks();
    this.getMeetings();
    this.getNearClubs();
  }

  getBooks() {
    var searchTerm;
    if (this.props.user.clubs[0]) {
      searchTerm = this.props.user.clubs[0].club_genre;
    } else {
      const terms =
      [
        'Arts Photography',
        'Biographies Memoirs',
        'Business Money',
        "Children's eBooks",
        'Comics Graphic Novels',
        "Computers Technology",
        "Cookbooks, Food Wine",
        "Crafts, Hobbies Home",
        "Education Teaching",
        "Engineering Transportation",
        "Foreign Languages",
        "Health, Fitness Dieting",
        "History",
        "Humor Entertainment",
        "Law",
        "Lesbian, Gay, Bisexual Transgender eBooks",
        "Literature Fiction",
        "Medical eBooks",
        "Mystery, Thriller Suspense",
        "Nonfiction",
        "Parenting Relationships",
        "Politics Social Sciences",
        "Reference",
        "Religion Spirituality",
        "Romance",
        "Science Math",
        "Science Fiction Fantasy",
        "Self-Help",
        "Sports Outdoors",
        "Teen Young Adult",
        "Travel"
      ];

      searchTerm = terms[Math.floor(Math.random()*terms.length)];
    }

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
        <SuggestedBooksPanel books={this.state.books} />
      </div>
    );
  }
}

export default Dashboard;
