import React from 'react';
import { Link } from 'react-router-dom';
import DateCard from './pretty-date.jsx';

const NoMeetings = () => (
  <div id="meetings-list" className="panel-card">
    <h3>UPCOMING MEETINGS</h3>
    <div>No meetings yet!</div>
  </div>
);

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
                  <DateCard time={meeting.meeting_date} />
                </div>
                <div className="col-md-9">
                  <div className="panel-body">
                    <h4>{meeting.meeting_name}</h4>
                    <p><em>{meeting.meeting_description}</em></p>
                    <p>hosted by {meeting.meeting_host}</p>
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
