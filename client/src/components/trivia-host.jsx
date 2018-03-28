import React from 'react';

class TriviaHost extends React.Component {
  constructor(props) {
  	super(props);
}
  
  render() {
  
return(
        <form action="javascript:void(0)" onSubmit={this.props.start} className="centered">
         <input 
           type="text"
           name="hostName"
           value={this.props.host}
           onChange={this.props.onHostChange}
           className="form-control uppercase score-board"
           placeholder="Enter a host name"
           required /> 
        <input 
           type="text"
           name="gameName"
           value={this.props.gameName}
           onChange={this.props.onGameChange}
           className="form-control uppercase score-board"
           placeholder="Enter a name for your Trivia game..."
           required />
         <button className="nav-buttons">Join as the Host!</button>
       </form> 
       
  	)
  }
}

export default TriviaHost;