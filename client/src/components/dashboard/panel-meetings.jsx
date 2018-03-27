import React from 'react';

const NoMeetings = () => (
  <div id="meetings-list" className="panel-card">
    <h3>UPCOMING MEETINGS</h3>
    <div>No meetings yet!</div>
  </div>
)

const MeetingsPanel = (props) => (
  !props.meetings || props.meetings.length === 0 ?
    <NoMeetings />
  : (
      <div id="meetings-list" className="panel-card">
        <h3>UPCOMING MEETINGS</h3>
        {props.meetings.map((meeting, id) =>
          (
            <div key={id}>
              <h5>{meeting.meeting_date + ' at ' + meeting.meeting_time}</h5>
              <p>{meeting.meeting_street_address}</p>
            </div>
          )
        )}
      </div>
    )
)

export default MeetingsPanel;