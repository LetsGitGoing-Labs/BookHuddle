import React from 'react';
import Meeting from './meeting.jsx';
import { Link } from 'react-router-dom';

class MeetingList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  render () {
    return (
      <div>
        <div className="listView">
        {this.props.meetings.map((meeting) =>
            <Meeting
            key={meeting.id}
            date={meeting.meeting_date}
            time={meeting.meeting_time}
            host={meeting.meeting_host}
            address={meeting.meeting_street_address}
            notes={meeting.meeting_notes}
            />
        )}
        </div>
      </div>
      )
  }

}

export default MeetingList;