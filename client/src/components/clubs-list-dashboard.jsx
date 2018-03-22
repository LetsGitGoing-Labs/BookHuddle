import React from 'react';

var ClubListDashboard = (props) => {
  if (!props.clubList || props.clubList.length === 0) {
    return (
      <div className="ui segment">
        <h3>Book Clubs Near You:</h3>
        <div>No clubs nearby right now!</div>
      </div>
    )
  } else {
    return (
      <div className="ui segment">
        <h3>Book Clubs Near You:</h3>

        <div className="ui five link cards">
          {props.clubList.map((club) =>
            <div className="card" onClick = {() => props.onClubClick(club)}>

            {/* Image? */}

            <div className="content">
              <div className="header">{club.title}</div>
            </div>

            {/* Genre? */}

            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ClubListDashboard;
