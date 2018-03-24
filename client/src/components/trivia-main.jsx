import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import TriviaPlayers from './trivia-players.jsx';
import TriviaHost from './trivia-host.jsx';
import TriviaScore from './trivia-score.jsx';
import TriviaJoin from './trivia-join.jsx';

class TriviaMain extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      gameName: 'Untitled',
      status: 'disconnected',
      playerName: '',
      player: {},
      players: [],
      host: {},
      hostName: '',
      hostJoin: false
  	}

  	this.connect = this.connect.bind(this);
  	this.disconnect = this.disconnect.bind(this);
  	this.welcome = this.welcome.bind(this);
    this.join = this.join.bind(this);
    this.emit = this.emit.bind(this);
    this.joined = this.joined.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.start = this.start.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onHostChange = this.onHostChange.bind(this);
    this.onGameChange = this.onGameChange.bind(this);
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
    console.log('clicked')
    this.emit('join', {playerName: this.state.playerName})
    event.preventDefault();
  }

  start() {
    
    this.emit('start', {
      hostName: this.state.hostName, 
      gameName: this.state.gameName
    })
  }

   
  onHostChange(e) {
    this.setState({
      hostName: e.target.value,
    })
  }

  onGameChange(e) {
    this.setState({
      gameName: e.target.value,
    })
  }

  onNameChange(playerName) {
   console.log(event)
    this.setState({
      playerName: playerName
    })
  }

  clickJoinHost(event) {
    this.setState({
      hostJoin: true
    })
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }

  connect() {
    let player = (sessionStorage.player) ? JSON.parse(sessionStorage.player) : null;

    if (player) {
      this.emit('join', player);
    } 

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
    sessionStorage.player =  JSON.stringify(player);
    
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
       
      <div>
        <TriviaJoin submit={this.join} onNameChange={this.onNameChange}/>
       
        {this.state.player.playerName && <TriviaPlayers player={this.state.player} players={this.state.players}/>} 
        <TriviaHost start={this.start} 
          onHostChange={this.onHostChange} 
          onGameChange={this.onGameChange}
         />
      
	      
	      
	      <TriviaScore />
	     </div>
      </div>
  	)
  }

}

export default TriviaMain;