import React from 'react';
import { Link } from 'react-router-dom';

import UpcomingMeetings from '../clubs/upcoming.jsx';
import CreateMeeting from '../clubs/create-meeting.jsx';
import MeetingPageNavbar from '../navigation/meeting-nav.jsx';

class Meeting extends React.Component {
  constructor(props) {
    super(props); this.state = {
      joinMsg: '',
    };
  }

  render() {
    let clubData;
    if (this.props.searchResults.length) {
      clubData = this.props.searchResults.find(club => club.id === Number(this.props.match.params.clubId));
    } else {
      clubData = this.props.clubs.find(club => club.id === this.props.match.params.clubId);
    }


    return (
      <div id="club-page" className="col-md-9">
        <div className="container">
          <h2 className="club-title">Meeting Page</h2>
          <MeetingPageNavbar />
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-home-tab">
            Details
            </div>
            <div className="tab-pane fade" id="nav-members" role="tabpanel" aria-labelledby="nav-members-tab">
                Members
            </div>
            <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                Trivia
            </div>
            <div className="tab-pane fade" id="nav-create-meeting" role="tabpanel" aria-labelledby="nav-create-meeting-tab">
              Discussion Questions
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Meeting;

// let meetingData = clubData.meetings.find(meeting => meeting.id === this.props.match.params.meetingId);
