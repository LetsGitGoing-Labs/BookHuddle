import React from 'react';
import { Link } from 'react-router-dom';

import UpcomingMeetings from './upcoming.jsx';
import '../../styles/club.css';

class Club extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      meetings: meetings
    };
  }

  render () {
    const clubData = this.props.clubs.find((ind) => ind.id === this.props.match.params.clubId)
    return (
      <div id="club-page" className="col-md-9">
        <div className="container">
          <h2 className="club-title">{clubData.title}</h2>
          <div>
            <nav id="club-page-nav" className="centered">
              <ul>
                <li><Link to="#">Upcoming</Link></li>
                <li><Link to="#">Members</Link></li>
                <li><Link to="#">Book History</Link></li>
                <li><Link to="#">Recommendations</Link></li>
                <li><Link to="#">Discussion</Link></li>
              </ul>
            </nav>
          </div>
          <div className="content-wrapper">
            <div className="btnDiv">
              <button className="btn btn-primary">New Meeting</button>
            </div>
            <UpcomingMeetings meetings={this.state.meetings}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Club;

const meetings = [
      {
        id: 1,
        meeting_date: 'March 30th, 2018',
        meeting_time: '7:30 PM',
        meeting_host: 'joey@gmail.com',
        meeting_topic: 'Finishing Persuasion',
        meeting_street_address: '123 Main Street, Houston, TX 12345',
        meeting_description: 'This will be the last meeting to wrap up Jane Austen\'s Persuasion',
        meeting_book: {
          amazon_id: null,
          title: 'Persuasion',
          author: 'Jane Austen',
          imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41uM9MBn1CL._SX326_BO1,204,203,200_.jpg'
        }
      }
    ];