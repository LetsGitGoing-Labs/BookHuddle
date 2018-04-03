import React from 'react';
import { Link } from 'react-router-dom';

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
      <div>
      <h4>Meeting Host: </h4>
      {this.props.meetingDetails.meetingHost}
      <h4>Meeting Location: </h4>
      {this.props.meetingDetails.meetingLocation}
      <h4>Meeting Notes: </h4>
      {this.props.meetingDetails.meetingNotes}
      </div>
    );
  }
};

export default MeetingDetails;

// let meetingData = clubData.meetings.find(meeting => meeting.id === this.props.match.params.meetingId);
