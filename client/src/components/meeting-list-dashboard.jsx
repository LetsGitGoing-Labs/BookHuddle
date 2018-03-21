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
              <div className="header">{meeting.date}</div>
            </div>

            {/*Location?*/}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MeetingListDashboard;
