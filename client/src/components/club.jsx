import React from 'react';
import MeetingList from './meetinglist.jsx';
import { Link } from 'react-router-dom';

class Club extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      meetings: [
      {
        id: 1,
        meeting_date: 'March 30th, 2018',
        meeting_time: '7:30 PM',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: '123 Main Street, Houston, TX 12345',
        meeting_notes: 'Hey everyone! Same place as usual.  We\'ll be finishing our discussion of Persuasion.  It\'s Bob\'s turn to bring refreshments.  I\'ll email the discussion questions the day of.',
        meeting_book: {
          amazon_id: null,
          title: 'Persuasion',
          author: 'Jane Austen',
          imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41uM9MBn1CL._SX326_BO1,204,203,200_.jpg'
        }
      },
      {
        id: 2,
        meeting_date: 'April 1st, 2018',
        meeting_time: '7:30 PM',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: '123 Main Street, Houston, TX 12345',
        meeting_notes: 'Next month we\'re reading Sense and Sensibility.  Amy and Stan are bringing refreshments.',
        meeting_book: {
          amazon_id: null,
          title: 'Sense and Sensibility',
          author: 'Jane Austen',
          imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/414hu6Q4xFL._SX324_BO1,204,203,200_.jpg'
        }
      },
      {
        id: 3,
        meeting_date: 'May 3rd, 2018',
        meeting_time: '10 am',
        meeting_host: 'joey@gamil.com',
        meeting_street_address: 'TBD',
        meeting_notes: 'For May we need someone to volunteer to host the meeting.  We\'ll be done with Persuasion, Thinking of reading .',
        meeting_book: {
          amazon_id: null,
          title: 'Mansfield park',
          author: 'Jane Austen',
          imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41jTnx6I%2BbL._SX324_BO1,204,203,200_.jpg'
        }
      }]
    };
  }

  render () {
    const clubData = this.props.clubs.find((ind) => ind.id === this.props.match.params.clubId)
    return (
        <div>
          <div className="clubHeader bg-light">
            <h1>{clubData.title}</h1>
          </div>
          <div>
            <nav className="navbar-light navbar-nav navbar-light mr-auto bg-light flexRow">
              <div >
                <ul className="navbar navbar-light mr-auto clubNav">
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
        <div className="btnDiv">
          <button className="btn btn-primary">New Meeting</button>
        </div>
        <MeetingList
            meetings={this.state.meetings}
          />
      </div>
      )
  }

}

export default Club;