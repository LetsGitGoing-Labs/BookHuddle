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
    return (
      <div>
      this.props.meetingDetails.meeting_host;
      </div>
    );
  }
};

export default MeetingDetails;

// let meetingData = clubData.meetings.find(meeting => meeting.id === this.props.match.params.meetingId);
