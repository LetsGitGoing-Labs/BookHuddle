import React from 'react';

const NoMeetings = () => (
  <div id="meetings-list" className="panel-card">
    <h3>UPCOMING MEETINGS</h3>
    <div>No meetings yet!</div>
  </div>
)

const MeetingsPanel = (props) => (
  !props.meetings || props.meetings.length === 0 ?
    <NoMeetings />
  : (
      <div id="meetings-list" className="panel-card">
        <h3>UPCOMING MEETINGS</h3>
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
                <div class="col-md-9">
                  <div class="panel-body">
                    <h4>Finishing Persuasion</h4>
                    <p><em>This will be the last meeting to wrap up Jane Austen's Persuation.</em></p>
                    <p>Host by James Brown</p>
                  </div>
                  <div class="panel-button">
                    <button className="btn btn-danger">See Details</button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    )
)

export default MeetingsPanel;