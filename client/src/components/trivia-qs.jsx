import React from 'react';
import { Table, Card, Button, CardTitle, CardText} from 'reactstrap';

class Questions extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
       
  	}
  	this.ask = this.ask.bind(this);
  	this.addQuestion = this.addQuestion.bind(this);
  }

  

  ask(question) {
  	this.props.emit('ask', question )
  	console.log(question)
  }

  addQuestion(question, i) {
    
    return (
      <div key={i} className="col-xs-12 col-sm-6 col-md-3">
        <Card body>
          <CardTitle>Question {i + 1}</CardTitle>
          <CardText>{question.q}</CardText>
          <button ref={btn => { this.btn = btn; }} onClick={this.ask.bind(null, question)}>Ask</button>
        </Card>
      </div>
    )
   
  }

  render() {
  	return (
      <div id="questions" className="row">
        <h2> Questions </h2>
        {this.props.questions.map(this.addQuestion)}
      
      </div>
  	)
  }
}

export default Questions;