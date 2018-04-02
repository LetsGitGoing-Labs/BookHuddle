import React from 'react';
import $ from 'jquery';
import CreateTriviaQs from './trivia-qform.jsx';

class Trivia extends React.Component {
  componentDidMount() {
    console.log('mounted')
  }
  handleSubmit(e) {
    e.preventDefault();

    const clubData = JSON.stringify(this.state);
    const query = `mutation HandleClubCreate($clubData: String) {
      handleClubCreate(clubData: $clubData)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          clubData,
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
    return (
      <div id="create-qs-form" className="col-md-9">
        <div className="container centered">
        <button className="play-but">Play Trivia!!!</button>
        <h5>Or...</h5>
          <h1 className="centered">Create Trivia Questions</h1>
          <CreateTriviaQs />  
        </div>
      </div>
    );
  }
}

export default Trivia;