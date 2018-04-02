import React from 'react';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const NoMeetings = () => (
  <div id="meetings-list" className="panel-card">
    <h3>UPCOMING MEETINGS</h3>
    <div>No meetings yet!</div>
  </div>
);

const meetingDate = function(timestamp) {
  return DateTime.fromISO(timestamp).toFormat('yyyy LLL dd t');
}

const MeetingsPanel = props => (
  !props.clubs || props.clubs.length === 0 ?
    <NoMeetings />
    : (
      <div id="meetings-list" className="panel-card">
        <h3>UPCOMING MEETINGS</h3>
        {props.clubs[0].meetings.map((meeting, id) =>
          (
            <div key={id} className="panel-content">
              <div className="row">
                <div className="col-md-3">
                  <img style={{width: '100px', height: '180px'}} src="http://covers.openlibrary.org/b/isbn/0451207149-M.jpg" />
                </div>
                <div className="col-md-9">
                  <div className="panel-body">
                    <h4>{meeting.meeting_name}</h4>
                    <p><em>{meetingDate(meeting.meeting_timestamp)}</em></p>
                    <p>hosted by {meeting.meeting_host}</p>
                    <p><em>{meeting.meeting_notes}</em></p>
                  </div>
                  <div className="panel-button">
                    <Link to={`dashboard/${meeting.club_id}/${id}`} ><button className="btn btn-danger">See Details</button></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    )
);

export default MeetingsPanel;
