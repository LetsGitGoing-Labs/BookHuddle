import React from 'react';
import io from 'socket.io-client';
import TriviaPlayers from './trivia-players.jsx';
import TriviaHost from './trivia-host.jsx';
import TriviaScore from './trivia-score.jsx';
import TriviaJoin from './trivia-join.jsx';

class TriviaMain extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      gameName: '',
      status: 'disconnected'
  	}

  	this.connect = this.connect.bind(this);
  	this.disconnect = this.disconnect.bind(this);
  	this.welcome = this.welcome.bind(this);
  }

  componentWillMount() {
    this.socket = io('http://localhost:4000');
    this.socket.on('connect', this.connect );
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
  }

  connect() {
  	this.setState({
  	  status: 'connected'
  	})
  }

  disconnect() {
  	this.setState({
  	  status: 'disconnected'
  	})
  }

  welcome(serverState) {
  	this.setState({
  	  gameName: serverState.gameName
  	})
  }

  render() {
  	return (
  	  <div>
      <header className="grid"> 
        <div>
          <h1> {this.state.gameName} </h1>
        </div>
        <div>
          <span> connected</span>
        </div>
      </header>
      
	      <TriviaPlayers />
	      <TriviaHost />
	      <TriviaScore />
	      <TriviaJoin />
      </div>
  	)
  }

}

export default TriviaMain;