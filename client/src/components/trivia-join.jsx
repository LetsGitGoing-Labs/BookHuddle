import React from 'react';
import ReactDOM from 'react-dom'

class TriviaJoin extends React.Component {
  join() {
    let playerName = React.findDOMNode(this.refs.name).value
    alert('hi ' + playerName)
  }
  render() {
  	return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <input 
          ref="name"
          className="form-control"
          placeholder="Enter a username"
          required /> 
        <button className="btn btn-primary">Join Trivia!</button>
      </form>
  	)
  }
}

export default TriviaJoin;