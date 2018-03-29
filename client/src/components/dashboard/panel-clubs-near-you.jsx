import React from 'react';
import { Link } from 'react-router-dom';

const NoClubsNearYou = () => (
  <div id="clubs-list" className="panel-card">
    <h3>CLUBS NEAR YOU</h3>
    <div>Sorry we couldn't find any clubs!</div>
  </div>
)

const ClubsNearYouPanel = (props) => (
  !props.clubs || props.clubs.length === 0 ?
    <NoClubsNearYou />
  : (
      <div id="clubs-list" className="panel-card">
        <h3>CLUBS NEAR YOU</h3>
        <div className="row">
        {props.clubs.map((club, id) =>
          (
            <div key={id} className="col-md-4">
              <Link to={`/dashboard/${club.id}`}>
                <img className="book-cover" src={`http://covers.openlibrary.org/b/isbn/${club.current_book_isbn}-M.jpg`}/>
                <p>{club.club_name}</p>
              </Link>
            </div>
          )
        )}
        </div>
      </div>
    )
)

export default ClubsNearYouPanel;