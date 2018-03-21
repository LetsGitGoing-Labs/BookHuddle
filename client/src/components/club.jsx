import React from 'react';
import MeetingList from './meetinglist.jsx';
import { Link } from 'react-router-dom';

class Club extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedClub: 'Jane Austin Fan Club',
      meetings: [
      {
        id: 1,
        meeting_date: 'March 30th, 2018',
        meeting_time: '7:30 PM',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: '123 Main Street, Houston, TX 12345',
        meeting_notes: 'Hey everyone! This will be our second dicussion of Persuasion.  I hope you\'re loving it!  We will provide the refreshments.'
      },
      {
        id: 2,
        meeting_date: 'April 1st, 2018',
        meeting_time: '7:30 PM',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: '123 Main Street, Houston, TX 12345',
        meeting_notes: 'Hey everyone! Same place as usual.  We\'ll be finishing our discussion of Persuasion.  It\'s Bob\'s turn to bring refreshments.  I\'ll email the discussion questions the day of.'
      },
      {
        id: 3,
        meeting_date: 'May 3rd, 2018',
        meeting_time: '10 am',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: 'TBD',
        meeting_notes: 'For May we need someone to volunteer to host the meeting.  We\'ll be done with Persuasion, anyone got any suggestions as to which book to read next?  It\'s gotta be Jane Austin.'
      }]
    }
  }

  render () {
    return (
        <div>
          <div>
          </div>




          <a className="navbar-brand" href="/">{this.state.selectedClub}</a>
          <div className="container">
            <nav className="navbar navbar-light bg-light flexRow">
              <div id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                  <Link to="#" className="nav-link">Upcoming</Link>
                  </li>
                  <li className="nav-item">
                  <Link to="#" className="nav-link">Members</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">Book History</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">Recommendations</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="#" className="nav-link">Discussion</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        <button className="btn btn-primary">New Meeting</button>
        <MeetingList
            club={this.state.selectedClub}
            meetings={this.state.meetings}
          />
      </div>
      )
  }

}

export default Club;