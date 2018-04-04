import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap'; 
import Questions from './Questions'; 
import Score from './Score'; 
import '../../styles/trivia.css';
 
 
class HostPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	return (
      <Container>
        <Row>
          <Col xs="6"><button className="nav-buttons" onClick={this.props.gameOver}>Game Over</button></Col>
          <Col xs="6"><button className="right nav-buttons" onClick={this.props.scoreRedirect}>Scoreboard</button></Col>

        </Row>
        <div>
          <Questions questions={this.props.questions} score={this.props.score} gameOver={this.props.gameOver} emit={this.props.emit} />
        </div>
      </Container>
  	);
  }
}
export default HostPage;

