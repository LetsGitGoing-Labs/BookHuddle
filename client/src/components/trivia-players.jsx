import React from 'react';
import Ask from './trivia-ask.jsx';

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
        <Ask question={this.props.currentQuestion} emit={this.props.emit}/>
  	  }
  	  </div>
  	)
  }
}

export default TriviaPlayers;