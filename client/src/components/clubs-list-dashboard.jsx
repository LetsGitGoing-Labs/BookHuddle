import React from 'react';

var ClubListDashboard = (props) => {
  if (!props.clubList || props.clubList.length === 0) {
    return (
      <div class="ui segment">
        <h3>Clubs Near You:</h3>
        <div>No clubs nearby right now!</div>
      </div>
    )
  } else {
    return (
      <div class="ui segment">
        <h3>Clubs Near You:</h3>

        <div class="ui five link cards">
          {props.clubList.map((club) =>
            <div class="card" onClick = {() => props.onRecipeClick(recipe)}>

            {/* Image? */}

            <div class="content">
              <div class="header">{club.title}</div>
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
