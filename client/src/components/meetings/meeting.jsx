import React from 'react';
import { Link } from 'react-router-dom';

import UpcomingMeetings from '../clubs/upcoming.jsx';
import CreateMeeting from '../clubs/create-meeting.jsx';
import MeetingPageNavbar from '../navigation/meeting-nav.jsx';
import Trivia from '../Trivia.jsx';

class Meeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('line15',this.props)
    let clubData = this.props.clubs.find((club) => {
      return club.id === +(this.props.match.params.clubId)
    });
    let meetingData = clubData.meetings.find((meeting) => {
      return meeting.id === +(this.props.match.params.meetingId)
    });

    return (
      <div id="club-page" className="col-md-9">
        <div className="container">
          <h2 className="club-title">Meeting Page</h2>
          <MeetingPageNavbar />
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-details" role="tabpanel" aria-labelledby="nav-details-tab">
            Details
            {meetingData.meeting_notes}
            </div>
            <div className="tab-pane fade" id="nav-meet-members" role="tabpanel" aria-labelledby="nav-meet-members-tab">
                Members
            </div>
            <div className="tab-pane fade" id="nav-trivia" role="tabpanel" aria-labelledby="nav-trivia-tab">
                Trivia
              <Trivia meetingData={this.props} />
            </div>
            <div className="tab-pane fade" id="nav-dq" role="tabpanel" aria-labelledby="nav-dq-tab">
              Discussion Questions
            </div>
          
          </div>
        </div>
      </div>
    );
  }
}

export default Meeting;