import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/club.css';

class Club extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      meetings: [
      {
        id: 1,
        meeting_date: 'March 30th, 2018',
        meeting_time: '7:30 PM',
        meeting_host: 'joey@gmail.com',
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
        meeting_host: 'joey@gmail.com',
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
        meeting_host: 'joey@gmail.com',
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
      <div id="club-page" className="col-md-9">
      <div className="container">
          <h2 className="clubHeader">{clubData.title}</h2>
          <div>
            <nav id="club-page-nav">
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
              {this.state.meetings.map((meeting) =>
                <div className="row meeting-content">
                  <div className="col-md-4">
                    <img className="book-cover" src={meeting.meeting_book.imgSrc}/>
                  </div>
                  <div key={meeting.id} className="meeting-text col-md-8">
                    <p>{meeting.meeting_date} @ {meeting.meeting_time}</p>
                    <p>{meeting.meeting_book.author}'s {meeting.meeting_book.title}</p>
                    <p>Hosted by {meeting.meeting_host}</p>
                    <p>{meeting.meeting_street_address}</p>
                    <p>{meeting.meeting_notes}</p>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>
    )
  }
}

export default Club;