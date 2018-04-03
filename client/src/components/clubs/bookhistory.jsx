import React from 'react';
import { DateTime, diff } from 'luxon';

const NoPastMeetings = () => (
  <div id="upcoming-meetings" className="panel-card">
    <div>Your past meetings will show here</div>
  </div>
);

class BookHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
    }
    this.meetingDate = this.meetingDate.bind(this);
  }

  componentDidMount() {
    const now = DateTime.local().ts;
    const list = this.props.meetings.filter((meeting) => (
      DateTime.fromISO(meeting.meeting_timestamp).valueOf() < now
    ))
    this.setState({
      meetings: list
    });
  }

  meetingDate(timestamp) {
    return DateTime.fromISO(timestamp).toFormat('yyyy LLL dd t');
  }

  render() {
    return(
      !this.state.meetings || this.state.meetings.length === 0 ?
        <NoPastMeetings />
      : (
        <div id="book-history">
          {this.state.meetings.map((meeting, id) =>
            (
              <div key={id} className="panel-content">
                <div className="row">
                  <div className="col-md-3">
                  Book Cover
                  </div>
                  <div className="col-md-9 vline-l">
                    <div className="meeting-dh">
                      <h4>{meeting.meeting_name}</h4>
                      <p><em>{this.meetingDate(meeting.meeting_timestamp)}</em></p>
                      <h6>Hosted by {meeting.meeting_host}</h6>
                    </div>
                    <div className="meeting-loc">
                      <div className="map-pin">
                        <i className="fas fa-map-marker-alt" />
                      </div>
                      <address className="map-address">
                        <p>James' Place</p>
                        <p>123 Main Street<br />Houston, TX</p>
                      </address>
                    </div>
                    <h6 className="meeting-description"><em>{meeting.meeting_notes}</em></h6>
                    <p className="meeting-description">{meeting.meeting_details}</p>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )
    )
  }
}

export default BookHistory;
