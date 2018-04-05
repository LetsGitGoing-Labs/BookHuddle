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
              <div key={id} className="panel-content container">
                <div className="row">
                  <div className="col-md-3 centered">
                    <img className="meeting-book" src={JSON.parse(meeting.meeting_book).bookImage} />
                  </div>
                  <div className="col-md-9">
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
                        <p style={{width:'50px'}}>{meeting.meeting_street_address}</p>
                      </address>
                    </div>
                    <h6 className="meeting-description"><em>{meeting.meeting_notes}</em></h6>
                    <p className="meeting-description">{meeting.meeting_details}</p>
                    <Link to={`${this.props.root}${meeting.club_id}/${meeting.id}`} ><button className="details-btn">See Details</button></Link>
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

