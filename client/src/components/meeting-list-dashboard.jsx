import React from 'react';

var MeetingListDashboard = (props) => {
  if (!props.meetingList || props.meetingList.length === 0) {
    return (
      <div class="ui segment">
        <h3>Upcoming Meetings:</h3>
        <div>No meetings yet!</div>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Upcoming Meetings:</h3>
        <div class="ui five link cards">
          {props.meetingList.map((meeting) =>
            <div class="card" onClick = {() => props.onMeetingClick(meeting)}>

            <div class="content">
              <div class="header">{meeting.date}</div>
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
