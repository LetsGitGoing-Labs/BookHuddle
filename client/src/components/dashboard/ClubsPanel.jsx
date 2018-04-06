import React from 'react';
import { Link } from 'react-router-dom';

const NoClubs = () => (
  <div id="clubs-list" className="panel-card">
    <h3>BOOK CLUBS</h3>
    <div>No clubs yet!</div>
  </div>
);

const ClubsPanel = props => (
  !props.clubs || props.clubs.length === 0 ?
    <NoClubs />
    : (
      <div id="clubs-list" className="panel-card">
        <h3>BOOK CLUBS</h3>
        <div className="row">
          {props.clubs.map((club, id) =>
          (
            <div key={id} className="col-md-4 centered mt">
              <Link to={`/dashboard/${club.id}`}>
                <img className="meeting-book" src={club.meetings[2] ? JSON.parse(club.meetings[2].meeting_book).bookImage : 'https://genderstudies.indiana.edu/images/publications/book-cover-placeholder.jpg'} />
                <p>{club.club_name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
);

export default ClubsPanel;
