import React from 'react';

import DateCard from '../dashboard/pretty-date.jsx';


const NoMeetings = () => (
  <div id="upcoming-meetings" className="panel-card">
    <div>No meetings yet!</div>
  </div>
);

const UpcomingMeetings = props => (
  !props.meetings || props.meetings.length === 0 ?
    <NoMeetings />
    : (
      <div id="upcoming-meetings">
        <h3>Upcoming Meetings</h3>
        {props.meetings.map((meeting, id) =>
          (
            <div key={id} className="panel-content">
              <div className="row">
                <div className="col-md-3">
                  <div className="date-panel">
                    <DateCard time={meeting.meeting_timestamp} />
                  </div>
                </div>
                <div className="col-md-9 vline-l">
                  <div className="meeting-dh">
                    <h4>{meeting.meeting_name}</h4>
                    <h6>Hosted by {meeting.meeting_host}</h6>
                  </div>
                  <div className="meeting-loc">
                    <div className="map-pin">
                      <i className="fas fa-map-marker-alt" />
                    </div>
                    <address className="map-address">
                      <p>James' Place</p>
                      <p>123 Main Street<br />Houston, TX</p>
                    </address>
                  </div>
                  <h6 className="meeting-description"><em>{meeting.meeting_notes}</em></h6>
                  <p className="meeting-description">{meeting.meeting_details}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    )
);

export default UpcomingMeetings;
