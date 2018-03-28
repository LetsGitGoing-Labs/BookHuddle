import React from 'react';

import DateCard from '../dashboard/pretty-date.jsx';


const NoMeetings = () => (
  <div id="upcoming-meetings" className="panel-card">
    <div>No meetings yet!</div>
  </div>
)

const UpcomingMeetings = (props) => (
  !props.meetings || props.meetings.length === 0 ?
    <NoMeetings />
  : (
      <div id="upcoming-meetings">
        <h3>Upcoming Meetings</h3>
        {props.meetings.map((meeting, id) =>
          (
            <div key={id} class="panel-content">
              <div class="row">
                <div class="col-md-3">
                  <div class="date-panel">
                    <DateCard time={meeting.meeting_date}/>
                  </div>
                </div>
                <div class="col-md-9 vline-l">
                  <div className="meeting-dh">
                    <h4>{meeting.meeting_name}</h4>
                    <h6>Hosted by {meeting.meeting_host}</h6>
                  </div>
                  <div className="meeting-loc">
                    <div class="map-pin">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <address class="map-address">
                      <p>James' Place</p>
                      <p>123 Main Street<br/>Houston, TX</p>
                    </address>
                  </div>
                    <h6 className="meeting-description"><em>{meeting.meeting_description}</em></h6>
                    <p className="meeting-description">{meeting.meeting_details}</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    )
)

export default UpcomingMeetings;