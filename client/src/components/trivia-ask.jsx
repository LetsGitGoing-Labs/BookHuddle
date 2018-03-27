import React from 'react';
import { Button } from 'reactstrap';


class Ask extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      answers: [],
      answer: undefined,
      correctAns: undefined,
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
      answer: answer,
      correctAns: this.props.question.ans,
      player: this.props.player.playerName
    })
    console.log('selection line 40',this.props.question)
  }



  addAnswers(answer, i) {
    return(
      <button onClick={this.selection.bind(null, answer)} className="col-xs-12 col-sm-6 ans-button1 ans-button2"key={i}> {answer}: {this.props.question[answer]}</button>
    )
  }

  render () {
  	return (
      <div id="currentQuestion">
      {this.state.answer &&
      	<div>
        <h2> You answered: {this.props.question[this.state.answer]}</h2>
         {this.props.results && <h2 id="text-answer"> This answer is: Correct</h2> }
         {!this.props.results && <h2> This answer is: Incorrect</h2>}
        <h2> Please wait for the next question...</h2>
        </div>
      }
      {!this.state.answer &&
      	<div>
	        <button className="q-button centerize">{this.props.question.q}</button>
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