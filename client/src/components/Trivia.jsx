import React from 'react';
import $ from 'jquery';
import CreateTriviaQs from './trivia-qform.jsx';
import TriviaMain from './trivia-main.jsx';

class Trivia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isQuestions: false,
    };
    this.retrieveTriviaQs = this.retrieveTriviaQs.bind(this);
  }

  componentDidMount() {
    this.setState = {
      isQuestions: false,
    };
  }

  retrieveTriviaQs() {
    const meetingTrivID = this.props.meetingData.match.params.meetingId;
    const query = `mutation GetTriviaQs($meetingTrivID: String) {
      getTriviaQs(meetingTrivID: $meetingTrivID)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          meetingTrivID,
        },
      }),
      success: () => {
        console.log('Trivia request sent');
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.setState({ isQuestions: true });
  }

  render() {
    return (

      <div>{this.state.isQuestions && <TriviaMain />}
        {!this.state.isQuestions &&
        <div id="create-qs-form" className="col-md-9">
          <div className="container centered">
            <button className="play-but" onClick={this.retrieveTriviaQs}>Play Trivia!!!</button>
            <h5>Or...</h5>
            <h1 className="centered">Create Trivia Questions</h1>
            <CreateTriviaQs meetingData={this.props.meetingData} />
          </div>
        </div>}
      </div>
    );
  }
}

export default Trivia;
