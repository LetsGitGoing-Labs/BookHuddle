import React from 'react';
import $ from 'jquery';
import TriviaQInputs from './trivia-qinputs.jsx';


class CreateTriviaQs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      a: '',
      b: '',
      c: '',
      d: '',
      ans: '',
      numQ: 1,
      newQ: [],
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddQ = this.handleAddQ.bind(this);
  }

  onChange(e) {
    const target = e.target.name;
    this.setState({
      [target]: e.target.value,
    });
  }

  handleAddQ() {
    const questionData = { q: this.state.q,
    a: this.state.a,
    b: this.state.b,
    c: this.state.c,
    d: this.state.d,
    ans: this.state.ans,}
    this.setState({numQ: this.state.numQ + 1})
    this.state.newQ.push(questionData)
    console.log('line33', this.state.newQ)
    this.setState({q: '', a: '', b: '', c: '', d: '', ans: '',}) 
  }

  handleSubmit(e) {
    e.preventDefault();
console.log(this.props)
console.log('line47',this.state)
    const triviaQuestions = JSON.stringify(this.state.newQ);
    const meetingTrivID = this.props.match.params.meetingId;
    console.log('line47',triviaQuestions, 'line48',meetingTrivID)
    const query = `mutation AddTriviaQs($triviaQuestions: String, $meetingTrivID: String) {
      addTriviaQs(triviaQuestions: $triviaQuestions, meetingTrivID: $meetingTrivID)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          triviaQuestions,
          meetingTrivID,
        },
      }),
      success: (data) => {
        console.log(data);
      },
      error: (data) => {
        console.log(data);
      },
    });
  }

  render() {
    const children = [];
    for (var i = 0; i < this.state.numQ; i++) {
      children.push(<TriviaQInputs key={i} number={i} onChange={this.onChange} numQ={this.state.numQ} />);
    };
    return (
      <div id="create-club-form" className="col-md-12">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            {children}
            <button onClick={this.handleAddQ} className="left">Add a Question</button> 
            <input type="submit" className="nav-buttons score-board" value="Submit Questions" />
          </form>
        </div>
      </div>
    );
  }
}


export default CreateTriviaQs;
