import React from 'react';

class MeetingDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let meeting = this.props.meetingDetails;

    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <img className="meeting-book" src="http://covers.openlibrary.org/b/isbn/0451207149-M.jpg" />
          </div>
          <div className="col-md-8" style={{margin: 'auto'}}>
            <div className="row">
              <div className="col-md-6">
                <h4>Wrapping Up</h4>
                <h6>Hosted by {meeting.meeting_host}</h6>
              </div>
              <div className="col-md-6 meeting-loc">
                <div className="map-pin">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <address className="map-address">
                  <p>James' Place</p>
                  <p>123 Main Street<br />Houston, TX</p>
                </address>
              </div>
            </div>
            <div className="row col-md-12" style={{marginTop: '20px'}}>
              <h6 className="meeting-description"><em>{meeting.meeting_notes}</em></h6>
              <p className="meeting-description">{meeting.meeting_details}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MeetingDetails;
