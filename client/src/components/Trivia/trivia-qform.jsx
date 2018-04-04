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
    const questionData = { q: this.state.q, a: this.state.a, b: this.state.b, c: this.state.c, d: this.state.d, ans: this.state.ans,};
    this.state.newQ.push(questionData);
    this.setState({q: '', a: '', b: '', c: '', d: '', ans: '', numQ: this.state.numQ + 1});
  }

  handleSubmit(e) {
    e.preventDefault();
    const questionData = { q: this.state.q, a: this.state.a, b: this.state.b, c: this.state.c, d: this.state.d, ans: this.state.ans,};
    this.state.newQ.push(questionData);
   console.log('trivia q props', this.props);
    const triviaQuestions = JSON.stringify(this.state.newQ);
    const meetingTrivID = Number(this.props.meetingData.match.params.meetingId);

    const query = `mutation HandleTriviaQs($triviaQuestions: String, $meetingTrivID: String) {
      handleTriviaQs(triviaQuestions: $triviaQuestions, meetingTrivID: $meetingTrivID)
    }`;
    console.log('line50', this.state.newQ);

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
      success: (meeting) => {
        meeting = JSON.parse(meeting.data.handleTriviaQs)[0];
        const questions = JSON.parse(meeting.trivia_questions);
        console.log(meeting);
        console.log(questions);
      },
      error: (data) => {
        console.log(data);
      },
    });
    this.setState({ q: '', a: '', b: '', c: '', d: '', ans: '', numQ: 0, newQ: [], });
  }

  render() {
    const children = [];
    for (let i = 0; i < this.state.numQ; i++) {
      children.push(<TriviaQInputs key={i} number={i} onChange={this.onChange} numQ={this.state.numQ} />);
    };
    return (
      <div id="create-club-form" className="col-md-12">
        <div className="container">
          {children}
          <button onClick={this.handleAddQ} className="left reset-button">Add a Question</button>
          <button onClick={this.handleSubmit} className="nav-buttons score-board">Submit Questions</button> 
        </div>
      </div>
    );
  }
}


export default CreateTriviaQs;
