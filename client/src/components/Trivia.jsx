import React from 'react';
import $ from 'jquery';

class Trivia extends React.Component {

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
      <div id="create-club-form" className="col-md-9">
        <div className="container">
          <h1 className="centerize">Create Trivia Questions</h1>
          
        </div>
      </div>
    );
  }
}

export default Trivia;