import React from 'react';
import { Button } from 'reactstrap';


class Ask extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      answers: [],
      answer: undefined
  	}
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
  	var answers = Object.keys(this.props.question);
  	answers.shift();
  	answers.pop();
  	this.setState({answers: answers, answer: sessionStorage.answer});
  }

  selection(answer) {
    this.setState({answer: answer})
    sessionStorage.answer = answer;
    this.props.emit('answer', {
      question: this.props.question,
      answer: answer
    })
  }

  addAnswers(answer, i) {
    return(
      <Button onClick={this.selection.bind(null, answer)} className="col-xs-12 col-sm-6"key={i}> {answer}: {this.props.question[answer]}</Button>
    )
  }

  render () {
  	return (
      <div id="currentQuestion">
      {this.state.answer &&
      	<div>
        <h2> You answered: {this.props.question[this.state.answer]}</h2>
        <h2> Please wait for the next question...</h2>
        </div>
      }
      {!this.state.answer &&
      	<div>
	        <h2>{this.props.question.q}</h2>
	        <div className="row">
	          {this.state.answers.map(this.addAnswers)}
	        </div>
        </div>
      }
      </div>
  	)
  }
}

export default Ask;