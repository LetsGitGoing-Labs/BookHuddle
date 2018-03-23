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
      status: 'disconnected',
      playerName: '',
      player: {},
      players: []
  	}

  	this.connect = this.connect.bind(this);
  	this.disconnect = this.disconnect.bind(this);
  	this.welcome = this.welcome.bind(this);
    this.join = this.join.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.emit = this.emit.bind(this);
    this.joined = this.joined.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
  }

  componentWillMount() {
    this.socket = io('http://localhost:4000');
    this.socket.on('connect', this.connect );
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.welcome);
    this.socket.on('joined', this.joined);
    this.socket.on('players', this.updatePlayers);
  }

  join(event) {
    
    
    this.emit('join', {playerName: this.state.playerName})
    event.preventDefault();
  }

  nameChange(event) {
    this.setState({
      playerName: event.target.value
    })
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
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

  joined(player) {
    this.setState({
      player: player
    })
  }

  updatePlayers(newPlayer) {
    this.setState({
      players: newPlayer
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
      {!this.state.player.playerName && 
        <form action="javascript:void(0)" onSubmit={this.join}>
         <input 
           type="text"
           value={this.state.value}
           onChange={this.nameChange}
           className="form-control"
           placeholder="Enter a username"
           required /> 
         <button className="btn btn-primary">Join Trivia!</button>
       </form> }
       {this.state.player.playerName && <TriviaPlayers player={this.state.player} players={this.state.players}/>} 
      
	      
	      <TriviaHost />
	      <TriviaScore />
	      
      </div>
  	)
  }

}

export default TriviaMain;