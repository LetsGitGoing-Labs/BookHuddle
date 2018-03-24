import React from 'react';
import ReactDOM from 'react-dom'

class TriviaJoin extends React.Component {
  constructor(props) {
    super(props);
  
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onNameChange(event.target.value)
  }


  render() {
  	return (
      <div>
        <form action="javascript:void(0)" onSubmit={this.props.submit}>
          <input 
            type="text"
            name="playerName"
            value={this.props.playerName}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Enter a username"
            required /> 
          <button className="btn btn-primary">Join Trivia!</button>
        </form>
        <a href="#" onClick={this.props.clickHostRedirect}>Join as the host</a>
      </div> 
  	)
  }
}

export default TriviaJoin;