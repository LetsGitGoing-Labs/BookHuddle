import React from 'react';
import '../styles/main.css';

var YourClubListDashboard = (props) => {
  if (!props.yourClubList || props.yourClubList.length === 0) {
    return (
      <div className="ui segment">
        <h2 className="dashboard-header">Your Book Clubs:</h2>
        <div>You're not in any book clubs!</div>
      </div>
    )
  } else {
    return (
      <div className="ui segment">
        <h2 className="dashboard-header">Your Book Clubs:</h2>
        <p></p>
        <div className="ui seven link cards">
          {props.yourClubList.map((yourClub) =>
            <div className="card" onClick = {() => props.onYourClubClick(yourClub)}>

            <div className="image">
              <img src={yourClub.image}/>
            </div>

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