import React from 'react';
import '../styles/trivia.css';

class Ask extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      answers: [],
      answer: undefined,
  	};
  	this.setAnswers = this.setAnswers.bind(this);
  	this.addAnswers = this.addAnswers.bind(this);
  	this.selection = this.selection.bind(this);
  }

  componentWillMount() {
  	this.setAnswers();
  }

  componentWillReceiveProps() {
  	this.setAnswers();
  }

  setAnswers() {
  	const answers = Object.keys(this.props.question);
  	answers.shift();
  	answers.pop();
  	this.setState({ answers, answer: sessionStorage.answer });
  }

  selection(answer) {
    this.setState({ answer });
    sessionStorage.answer = answer;
    this.props.emit('answer', {
      question: this.props.question,
      answer,
      player: this.props.player.playerName,
    });
  }

  addAnswers(answer, i) {
    return (
      <button onClick={this.selection.bind(null, answer)} className="col-xs-12 col-sm-6 ans-button1 ans-button2"key={i}> {answer}: {this.props.question[answer]}</button>
    );
  }

  render() {
  	return (
      <div id="currentQuestion">
        {this.state.answer &&
          <div>
            <h2> You answered: {this.props.question[this.state.answer]}</h2>
              {this.props.results && <h2 id="correct" className="centered"> CORRECT!!!</h2> }
              {!this.props.results && <h2 id="incorrect" className="centered"> WRONG!!!</h2>}
            <h5 className="centered"> Please wait for the next question...</h5>
          </div>
        }
        {!this.state.answer &&
          <div className="centered">
            <button className="q-button">{this.props.question.q}</button>
            <div className="row">
              {this.state.answers.map(this.addAnswers)}
            </div>
          </div>
        }
      </div>
  	);
  }
}

export default Ask;
