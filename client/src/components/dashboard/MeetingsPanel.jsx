import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import MeetingsList from '../meetings/MeetingsList';

class MeetingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetings: [],
    }
    this.filterMeetings = this.filterMeetings.bind(this);
  }

  componentWillMount() {
    this.filterMeetings();
  }

  filterMeetings() {
    const now = DateTime.local().ts;
    if (this.props.clubs[0]) {

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
  }

  render() {
    return(
      <div id="meetings-list" className="panel-card">
        <h3>UPCOMING MEETINGS</h3>
        <MeetingsList root='dashboard/' meetings={this.state.meetings}/>
      </div>
    )
  }
}

export default MeetingsPanel;