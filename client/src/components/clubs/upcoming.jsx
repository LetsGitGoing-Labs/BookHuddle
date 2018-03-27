import React from 'react';

const NoUpcomingMeetings = () => (
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
                    <p>Monday</p>
                    <h2>24</h2>
                    <p>March</p>
                    <h6>9:00 AM</h6>
                  </div>
                </div>
                <div class="col-md-9 vline-l">
                  <div className="meeting-dh">
                    <h4>Finishing Persuasion</h4>
                    <h6>Hosted by James Brown</h6>
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
                    <h6 className="meeting-description"><em>This will be the last meeting to wrap up Jane Austen's Persuasion.</em></h6>
                    <p className="meeting-description">Hey everyone! Same place as usual.  We'll be finishing our discussion of Persuasion.  It's Bob's turn to bring refreshments.  I'll email the discussion questions the day of.</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    )
)

export default UpcomingMeetings;