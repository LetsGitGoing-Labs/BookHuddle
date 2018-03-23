import React from 'react';

class TriviaPlayers extends React.Component {
  render() {
  	return (
  	  <div>
        <h1>Get ready {this.props.player.playerName}!</h1>
        <p>Players: {this.props.players.length}</p>
  	  </div>
  	)
  }
}

export default TriviaPlayers;