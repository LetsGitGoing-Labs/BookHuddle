import React from 'react';
import Score from './trivia-score.jsx';
import Questions from './trivia-qs.jsx';
import { Container, Row, Col, Button } from 'reactstrap';


class HostPage extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {
  	return (
  	  <Container>
        <Row>
          <Col xs="6"><Button size="sm" color="info"  onClick={this.props.scoreRedirect}>Game Over</Button></Col>
          <Col xs="6"><Button size="sm" color="info" className="right" onClick={this.props.scoreRedirect}>Scoreboard</Button></Col>

        </Row>
    <div>
      <Questions questions={this.props.questions} emit={this.props.emit}/>

    </div>
    </Container>
  	)
  }
}
  export default HostPage;

