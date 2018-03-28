import React from 'react';
import Ask from './trivia-ask.jsx';
import Score from './trivia-score.jsx';
import '../styles/trivia.css';

import { Container, Row, Col, Button } from 'reactstrap';

class TriviaPlayers extends React.Component {
  render() {
  	let player = this.props.player.playerName;
  	return (
  	  <Container>
        <Row>
          <Col xs="6"><p className="left"> Player: {player}</p></Col>
          <Col xs="6"><button  className="right nav-buttons " onClick={this.props.scoreRedirect}>Scoreboard</button></Col>
        </Row>	
        <div>
  	      {!this.props.currentQuestion &&
  	        <div>
              <h1 className="centered">Get ready {player}!</h1> 
						</div>
					}
  	      {this.props.currentQuestion &&
  	  	    <div>
              <Ask question={this.props.currentQuestion} gameOver={this.props.gameOver} results={this.props.results} player={this.props.player} score={this.props.score} emit={this.props.emit}/>
  	        </div>
  	      }
  	    </div>
  	  </Container>
  	)
  }
}

export default TriviaPlayers;