import React from 'react';
import ReactDOM from 'react-dom'

class TriviaJoin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: ''
    }
    this.join = this.join.bind(this);
    this.nameChange = this.nameChange.bind(this);
  }

  join(event) {
    
    alert('hi ' + this.state.playerName)
    event.preventDefault();
  }

  nameChange(event) {
    this.setState({
      playerName: event.target.value
    })
  }

  render() {
  	return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <input 
          type="text"
          value={this.state.value}
          onChange={this.nameChange}
          className="form-control"
          placeholder="Enter a username"
          required /> 
        <button className="btn btn-primary">Join Trivia!</button>
      </form>
  	)
  }
}

export default TriviaJoin;