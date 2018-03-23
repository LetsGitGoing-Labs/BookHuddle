import React from 'react';
import '../styles/main.css';

class MeetingList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (!this.props.meetingList || this.props.meetingList.length === 0) ?
      (
        <div className="ui segment">
          <h2 className="dashboard-header">Upcoming Meetings:</h2>
          <div>No meetings yet!</div>
        </div>
      ) : (
        <div className="ui segment">
          <h2 className="dashboard-header">Upcoming Meetings:</h2>
          <div className="ui four cards">
            {this.props.meetingList.map((meeting, id) =>
              ( <div key={id} className="card">
                  <div className="content">
                    <h2 className="header">{meeting.meeting_date + ' at ' + meeting.meeting_time}</h2>
                  </div>
                  <div className="content">
                    <div className="ui sub header">{meeting.meeting_street_address}</div>
                  </div>
                </div>
              ))
            }
        </div>
      </div>
    )
  }
}

export default MeetingList;
