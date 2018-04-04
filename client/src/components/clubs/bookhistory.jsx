import React from 'react';
import MeetingsList from '../meetings/meeting-list.jsx';

class BookHistory extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
        <h3>Book History</h3>
        <MeetingsList root='' meetings={this.props.pastMeetings} />
      </div>
    )
  }
}

export default BookHistory;
