import React from 'react';
import { Table, Card, Button, CardTitle, CardText } from 'reactstrap';
import '../../styles/trivia.css';

class Questions extends React.Component {
  constructor(props) {
  	super(props);
  	this.ask = this.ask.bind(this);
  	this.addQuestion = this.addQuestion.bind(this);
  	this.endGame = this.endGame.bind(this);
  }

  ask(question) {
  	this.props.emit('ask', question);
  	console.log('question is: ',question);
  }

  endGame(score) {
  	this.props.emit('gameover', this.props.score);
  }

  addQuestion(question, i) {
    return (
      <div key={i} className="col-xs-12 col-sm-6 col-md-3 centered score-board">
        <Card body>
          <CardTitle>Question {i + 1}</CardTitle>
          <CardText>{question.q}</CardText>
          <button ref={(btn) => { this.btn = btn; }} onClick={this.ask.bind(null, question)}>Ask</button>
        </Card>
      </div>
    );
  }

  render() {
  	return (
      <div>
        <div id="questions" className="row centered">
          {this.props.questions.map(this.addQuestion)}
        </div>
        <div className="centered">
          <button className="nav-buttons"onClick={this.endGame}>And the winner is...</button>
        </div>
      </div>
  	);
  }
}

export default Questions;
