import React from 'react';
import MeetingEntry from './meetings-list.jsx';

var UpcomingMeetings = (props) =>
  if (props.meetingList.length === 0) {
    return (
      <div>
        <h3>Upcoming Meetings:</h3>
        <div>No meetings yet!</div>
      </div>
  }