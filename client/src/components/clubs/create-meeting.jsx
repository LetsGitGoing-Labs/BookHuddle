import React from 'react';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import AlgoliaPlaces from 'algolia-places-react';

class CreateMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meeting_timestamp: '',
      meeting_host: '',
      meeting_location: '',
      meeting_notes: '',
      meeting_book: '',
      clubId: ''
    };
    this.onChange = this.onChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleCreateMeeting = this.handleCreateMeeting.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const target = e.target.name;
    this.setState({
      [target]: e.target.value,
    });
  }

  setLocation(e) {
    this.setState({
      meeting_location: (`${e.suggestion.name}, ${e.suggestion.administrative}`),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger;
    let meetingData = this.state;
    meetingData.clubId = this.props.clubData.match.params.clubId
    meetingData = JSON.stringify(meetingData);
    this.handleCreateMeeting(meetingData);
  }

  handleCreateMeeting(meetingData) {
    const query = `mutation handleCreateMeeting($meetingData: String) {
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
      <div id="create-meeting" className="col-md-9">
        <div className="container cent">
          <h3>Create New Meeting</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input type="text" className="form-control" id="meeting-name" placeholder="Meeting Time & Date" name="meeting_timestamp" value={this.state.meeting_timestamp} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="meeting-name" placeholder="Meeting Host" name="meeting_host" value={this.state.meeting_host} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <input className="form-control" id="inputClubDescription" rows="3" placeholder="Add a brief description.  Book to be discussed, who will bring snacks, etc." name="meeting_notes" value={this.state.meeting_notes} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="meeting-name" placeholder="Meeting Book" name="meeting_book" value={this.state.meeting_book} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <AlgoliaPlaces placeholder="Meeting address" onChange={e => this.setLocation(e)} />
            </div>
            <input type="submit" className="btn btn-primary centered" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateMeeting;
