import React from 'react';
import { Link } from 'react-router-dom';

import UpcomingMeetings from './upcoming.jsx';
import CreateMeeting from './create-meeting.jsx';
import ClubPageNavbar from '../navigation/club-nav.jsx';

import '../../styles/club.css';

class Club extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const clubData = this.props.clubs.find((club) => club.id === this.props.match.params.clubId)
    return (
      <div id="club-page" className="col-md-9">
        <div className="container">
          <h2 className="club-title">{clubData.club_name}</h2>
            <ClubPageNavbar />
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-home-tab">
              <UpcomingMeetings meetings={clubData.meetings}/>
              </div>
              <div class="tab-pane fade" id="nav-members" role="tabpanel" aria-labelledby="nav-members-tab">
                Members
              </div>
              <div class="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                Book History
              </div>
              <div class="tab-pane fade" id="nav-create-meeting" role="tabpanel" aria-labelledby="nav-create-meeting-tab">
                <CreateMeeting />
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Club;