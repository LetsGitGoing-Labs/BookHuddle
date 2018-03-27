import React from 'react';
import Ask from './trivia-ask.jsx';
import Score from './trivia-score.jsx';
import { Container, Row, Col, Button } from 'reactstrap';

class TriviaPlayers extends React.Component {
  render() {
  	let player = this.props.player.playerName;
  	return (
  	  <Container>
        <Row>
          <Col xs="6"><p className="left"> Player: {player}</p></Col>
          <Col xs="6"><Button size="sm" color="info" className="right" onClick={this.props.scoreRedirect}>Scoreboard</Button></Col>

        </Row>

  	
 <div>
  	  {!this.props.currentQuestion &&
  	  <div>
        <h1>Get ready {player}!</h1>
        
        
  	  </div>}
  	  {this.props.currentQuestion &&
  	  	<div>
        <Ask question={this.props.currentQuestion} results={this.props.results} player={this.props.player} emit={this.props.emit}/>
  	    </div>
  	  }
  	  
  	  </div>
  	  </Container>
  	)
  }
}

export default TriviaPlayers;