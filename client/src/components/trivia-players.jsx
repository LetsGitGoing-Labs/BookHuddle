import React from 'react';

class TriviaPlayers extends React.Component {
  render() {
  	return (
  		<div>
  	  {!this.props.currentQuestion &&
  	  <div>
        <h1>Get ready {this.props.player.playerName}!</h1>
        <p>Players: {this.props.players.length}</p>
  	  </div>}
  	  {this.props.currentQuestion &&
        <h2>{this.props.currentQuestion.q}</h2>
  	  }
  	  </div>
  	)
  }
}

export default TriviaPlayers;