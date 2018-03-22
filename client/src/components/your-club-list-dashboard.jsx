import React from 'react';

var YourClubListDashboard = (props) => {
  if (!props.yourClubList || props.yourClubList.length === 0) {
    return (
      <div className="ui segment">
        <h3>Your Book Clubs:</h3>
        <div>You're not in any book clubs!</div>
      </div>
    )
  } else {
    return (
      <div className="ui segment">
        <h3>Your Book Clubs:</h3>
        <div className="ui five link cards">
          {props.yourClubList.map((yourClub) =>
            <div className="card" onClick = {() => props.onYourClubClick(yourClub)}>

            {/* Image? */}

            <div className="content">
              <div className="header">{yourClub.title}</div>
            </div>

            {/* Genre? */}

            </div>
          )}
        </div>
      </div>
    )
  }
}

export default YourClubListDashboard;