import React from 'react';
import {Redirect} from 'react-router-dom';

class MeetingDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCancelled: false,
      clubId: this.props.meetingDetails.club_id,
    }
    this.handleCancelMtg = this.handleCancelMtg.bind(this);
    this.cancelMeeting = this.cancelMeeting.bind(this);
  }

  handleCancelMtg() {
    let check = confirm('Are you sure you want to cancel?')
    if (check) {
      let meetingId = this.props.meetingDetails.id;
      this.cancelMeeting(meetingId)
    }
  }

  cancelMeeting(meetingId) {
    const query = `mutation cancelMeeting($meetingId: String) {
      cancelMeeting(meetingId: $meetingId)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: { meetingId },
      }),
      success: (data) => {
        this.setState({
          isCancelled: true,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  render() {
    let meeting = this.props.meetingDetails;
    return this.state.isCancelled ? (<Redirect to={`/dashboard/${this.state.clubId}`}/>) : (
      <div>
        <div className="row">
          <div className="col-md-4">
            <img className="meeting-book" src={JSON.parse(meeting.meeting_book).bookImage} />
          </div>
          <div className="col-md-8" style={{margin: 'auto'}}>
            <div className="row">
              <div className="col-md-6">
                <h4>{JSON.parse(meeting.meeting_book).bookTitle}</h4>
                <h6>Hosted by {meeting.meeting_host}</h6>
              </div>
              <div className="col-md-6 meeting-loc">
                <div className="map-pin">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <address className="map-address">
                <p style={{width:'50px'}}>{meeting.meeting_street_address}</p>
                </address>
              </div>
            </div>
            <div className="row col-md-12" style={{marginTop: '20px'}}>
              <h5 className="meeting-description"><em>{meeting.meeting_notes}</em></h5>
              <h6 className="meeting-description"><em>{meeting.meeting_details}</em></h6>
            </div>
            <button className="btn btn-danger" onClick={this.handleCancelMtg}>
              Cancel Meeting
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default MeetingDetails;
