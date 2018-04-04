import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const NoMeetings = () => (
  <div className="panel-card">
    <div>No meetings to show</div>
  </div>
);

class MeetingsList extends React.Component {
  constructor(props) {
    super(props);
    this.meetingDate = this.meetingDate.bind(this);
  }

  meetingDate(timestamp) {
    return DateTime.fromISO(timestamp).toFormat('yyyy LLL dd t');
  }

  render() {
    return(
      <div>
      {!this.props.meetings || this.props.meetings.length === 0 ?
        <NoMeetings />
      : (
        <div>
          {this.props.meetings.map((meeting, id) =>
            (
              <div key={id} className="panel-content">
                <div className="row">
                  <div className="col-md-3">
                    <img className="meeting-book" src="http://covers.openlibrary.org/b/isbn/0451207149-M.jpg" />
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
                  <div className="panel-button">
                    <Link to={`${this.props.root}${meeting.club_id}/${meeting.id}`} ><button className="btn btn-danger">See Details</button></Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
      </div>
    )
  }
}

export default MeetingsList;

