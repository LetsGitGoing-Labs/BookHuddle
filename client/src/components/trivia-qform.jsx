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
    const questionData = JSON.stringify(this.state);
    this.setState({numQ: this.state.numQ + 1})
    newQ.push(questionData)
    console.log('line33', newQ)
    this.setState({q: '', a: '', b: '', c: '', d: '', ans: '',}) 
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
            
          </form>
          
        </div>
        <input type="submit" className="nav-buttons centered" value="Submit Questions" />
      </div>
    );
  }
}
const newQ = [];

export default CreateTriviaQs;
