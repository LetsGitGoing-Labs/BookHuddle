import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const NoMeetings = () => (
  <div id="meetings-list" className="panel-card">
    <h3>UPCOMING MEETINGS</h3>
    <div>No meetings yet!</div>
  </div>
);

class MeetingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
    }
    this.meetingDate = this.meetingDate.bind(this);
  }

  componentDidMount() {
    const now = DateTime.local().ts;
    const list = this.props.clubs[0].meetings
      .filter((meeting) => (
        DateTime.fromISO(meeting.meeting_timestamp).valueOf() > now
      ))
      .sort((a,b) => (
        DateTime.fromISO(a.meeting_timestamp).valueOf() - DateTime.fromISO(b.meeting_timestamp).valueOf()
      ));
    this.setState({
      meetings: list
    });
  }

  meetingDate(timestamp) {
    return DateTime.fromISO(timestamp).toFormat('yyyy LLL dd t');
  }

  render() {
    return(
      !this.state.meetings || this.state.meetings.length === 0 ?
        <NoMeetings />
      : (
        <div id="meetings-list" className="panel-card">
          <h3>UPCOMING MEETINGS</h3>
          {this.state.meetings.map((meeting, id) => (
            <div key={id} className="panel-content">
              <div className="row">
                <div className="col-md-3">
                  <img className="meeting-book" src="http://covers.openlibrary.org/b/isbn/0451207149-M.jpg" />
                </div>
                <div className="col-md-9">
                  <div className="panel-body">
                    <h4>{meeting.meeting_name}</h4>
                    <p><em>{this.meetingDate(meeting.meeting_timestamp)}</em></p>
                    <p>hosted by {meeting.meeting_host}</p>
                    <p><em>{meeting.meeting_notes}</em></p>
                  </div>
                  <div className="panel-button">
                    <Link to={`dashboard/${meeting.club_id}/${meeting.id}`} ><button className="btn btn-danger">See Details</button></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    )
  }
}

export default MeetingsPanel;