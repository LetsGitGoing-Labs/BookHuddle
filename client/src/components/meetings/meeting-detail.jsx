import React from 'react';
import { Link } from 'react-router-dom';
import DateCard from '../dashboard/pretty-date.jsx';

import UpcomingMeetings from '../clubs/upcoming.jsx';
import CreateMeeting from '../clubs/create-meeting.jsx';
import MeetingPageNavbar from '../navigation/meeting-nav.jsx';

class MeetingDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('meeting details:', this.props.meetingDetails)

    return (
      <div className="panel-content">
        <div>
          <div className="meeting-dh">
            <h4>Meeting Host: </h4>
              <p>{this.props.meetingDetails.meetingHost}</p>
            <h4>Meeting Time: </h4>
              <p>{this.props.meetingDetails.meetingTimestamp}</p>
            <h4>Meeting Notes: </h4>
              <p>{this.props.meetingDetails.meetingNotes}</p>
            <h4>Meeting Location: </h4>
            <div className="meeting-loc">
              <div className="map-pin">
                <i className="fas fa-map-marker-alt" />
              </div>
                <address className="map-address">
                {this.props.meetingDetails.meetingLocation}
                </address>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MeetingDetails;

// let meetingData = clubData.meetings.find(meeting => meeting.id === this.props.match.params.meetingId);
