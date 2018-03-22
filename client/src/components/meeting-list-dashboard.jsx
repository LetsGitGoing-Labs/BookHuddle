import React from 'react';
import '../styles/main.css';

var MeetingListDashboard = (props) => {
  if (!props.meetingList || props.meetingList.length === 0) {
    return (
      <div className="ui segment">
        <h2 className="dashboard-header">Upcoming Meetings:</h2>
        <div>No meetings yet!</div>
      </div>
    )
  } else {
    return (
      <div className="ui segment">
        <h2 className="dashboard-header">Upcoming Meetings:</h2>
        <p></p>
        <div className="ui four cards">
          {props.meetingList.map((meeting) =>
            <div className="card" onClick = {() => props.onMeetingClick(meeting)}>

            <div className="content">
              <h2 className="header">{meeting.meeting_date + ' at ' + meeting.meeting_time}</h2>
            </div>

            <div className="content">
              <div className="ui sub header">{meeting.meeting_street_address}</div>
            </div>

            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MeetingListDashboard;
