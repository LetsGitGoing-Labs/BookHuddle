import React from 'react';
import MeetingsList from '../meetings/meeting-list.jsx';

const UpcomingMeetings = props => (
  <div className="tab-pane fade show active" id="nav-upcoming" role="tabpanel" aria-labelledby="nav-home-tab">
    <h4>Upcoming Meetings</h4>
    <MeetingsList root='' meetings={props.futureMeetings} />
  </div>
);

export default UpcomingMeetings;



