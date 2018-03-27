import React from 'react';
import { Link } from 'react-router-dom';

const NoClubs = () => (
  <div id="clubs-list" className="panel-card">
    <h3>BOOK CLUBS</h3>
    <div>No clubs yet!</div>
  </div>
)

const ClubsPanel = (props) => (
  !props.clubs || props.clubs.length === 0 ?
    <NoClubs />
  : (
      <div id="clubs-list" className="panel-card">
        <h3>BOOK CLUBS</h3>
        <div className="row">
        {props.clubs.map((club, id) =>
          (
            <div key={id} className="col-md-4">
              <img className="book-cover" src={club.image}/>
              <p>{club.title}</p>
              <Link to={`/dashboard/${club.id}`}>Details</Link>
            </div>
          )
        )}
        </div>
      </div>
    )
)

export default ClubsPanel;