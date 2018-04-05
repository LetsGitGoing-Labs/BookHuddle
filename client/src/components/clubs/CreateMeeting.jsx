import React from 'react';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import AlgoliaPlaces from 'algolia-places-react';

import MeetingSearchbar from './MeetingSearchbar';
import MeetingSearchResultsPanel from './MeetingSearchResultsPanel';

class CreateMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingTimestamp: '',
      meetingHost: '',
      meetingLocation: '',
      meetingNotes: '',
      meetingBook: '',
      clubId: '',
      books: [],
      bookData: ''
    };
    this.onChange = this.onChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleCreateMeeting = this.handleCreateMeeting.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getBooks = this.getBooks.bind(this);
    this.loadBook = this.loadBook.bind(this);
  }

  loadBook(bookImage, bookTitle) {
    let bookData = JSON.stringify({
        bookImage: bookImage,
        bookTitle: bookTitle
      });
    this.setState({
      bookData: bookData
    });
  }

  onChange(e) {
    const target = e.target.name;
    this.setState({
      [target]: e.target.value,
    });
  }

  setLocation(e) {
    this.setState({
      meetingLocation: (`${e.suggestion.name}, ${e.suggestion.administrative}`),
    });
  }

  getBooks(e, searchTerm) {
    e.preventDefault();
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

  handleSubmit(e) {
    e.preventDefault();
    let meetingData = {meetingTimestamp: this.state.meetingTimestamp, meetingHost: this.state.meetingHost, meetingLocation: this.state.meetingLocation, meetingNotes: this.state.meetingNotes, meetingBook: this.state.bookData, clubId: this.state.clubId};
    meetingData.clubId = this.props.clubData.match.params.clubId;
    meetingData = JSON.stringify(meetingData);
    this.handleCreateMeeting(meetingData);
  }

  handleCreateMeeting(meetingData) {
    const query = `mutation HandleCreateMeeting($meetingData: String) {
      handleCreateMeeting(meetingData: $meetingData)
    }`;
    console.log('meetingData: ', meetingData);

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          meetingData,
        },
      }),
      success: (data) => {
        console.log('success');
        this.setState({
          isSubmitted: true,
        });
      },
      error: (data) => {
        console.log(data);
      },
    });
  }

  render() {
    return (
      <div className="tab-pane fade" id="nav-create-meeting" role="tabpanel" aria-labelledby="nav-create-meeting-tab">
        <div id="create-meeting" className="col-md-9">
          <div className="container cent">
            <h3>Create New Meeting</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-group">
                <input type="text" className="form-control" id="meeting-name" placeholder="Meeting Time & Date" name="meetingTimestamp" value={this.state.meetingTimestamp} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="meeting-name" placeholder="Meeting Host" name="meetingHost" value={this.state.meetingHost} onChange={this.onChange} />
              </div>
              <div className="form-group">
                <input className="form-control" id="inputClubDescription" rows="3" placeholder="Add a brief description.  Book to be discussed, who will bring snacks, etc." name="meetingNotes" value={this.state.meetingNotes} onChange={this.onChange} />
              </div>
              <MeetingSearchbar searchBooks={this.getBooks}/>
              <MeetingSearchResultsPanel loadBook={this.loadBook} results={this.state.books}/>
              <div className="form-group">
                <AlgoliaPlaces placeholder="Meeting address" onChange={e => this.setLocation(e)} />
              </div>
              <input type="submit" className="btn btn-primary centered" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMeeting;
