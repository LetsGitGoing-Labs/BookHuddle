import React from 'react';

class TriviaHost extends React.Component {
  constructor(props) {
  	super(props);
}
  // 	this.handleChange = this.handleChange.bind(this);
  // }

  // handleChange(e) {
  	
  //   this.props.onHostChange(event.target.value)
  // } 
  render() {
  
return(
        <form action="javascript:void(0)" onSubmit={this.props.start}>
         <input 
           type="text"
           name="hostName"
           value={this.props.hostName}
           onChange={this.props.onHostChange}
           className="form-control"
           placeholder="Enter a host name"
           required /> 
        <input 
           type="text"
           name="gameName"
           value={this.props.gameName}
           onChange={this.props.onGameChange}
           className="form-control"
           placeholder="Enter a name for your Trivia game..."
           required />
         <button className="btn btn-primary">Join as the Host!</button>
       </form> 
       
  	)
  }
}

export default TriviaHost;