import React from 'react';

var MeetingListDashboard = (props) => {
  if (!props.meetingList || props.meetingList.length === 0) {
    return (
      <div className="ui segment">
        <h3>Upcoming Meetings:</h3>
        <div>No meetings yet!</div>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Upcoming Meetings:</h3>
        <div className="ui five link cards">
          {props.meetingList.map((meeting) =>
            <div className="card" onClick = {() => props.onMeetingClick(meeting)}>

            <div className="content">
              <h2 className="header">{meeting.meeting_date}</h2>
            </div>

            <div className="content">
              <h2 className="sub header">{meeting.meeting_time}</h2>
            </div>

            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MeetingListDashboard;
