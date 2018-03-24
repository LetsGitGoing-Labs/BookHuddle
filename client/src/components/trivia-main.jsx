import React from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import TriviaPlayers from './trivia-players.jsx';
import TriviaHost from './trivia-host.jsx';
import TriviaScore from './trivia-score.jsx';
import TriviaJoin from './trivia-join.jsx';
import HostPage from './trivia-hostpage.jsx';

class TriviaMain extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      gameName: '',
      status: 'disconnected',
      playerName: '',
      player: {},
      players: [],
      host: {},
      host: '',
      viewState: 'join',
      questions: [],
      currentQuestion: false
  	}

  	this.connect = this.connect.bind(this);
  	this.disconnect = this.disconnect.bind(this);
  	this.updateState = this.updateState.bind(this);
    this.join = this.join.bind(this);
    this.emit = this.emit.bind(this);
    this.joined = this.joined.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.start = this.start.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onHostChange = this.onHostChange.bind(this);
    this.onGameChange = this.onGameChange.bind(this);
    this.clickHostRedirect = this.clickHostRedirect.bind(this);
    this.starter = this.starter.bind(this);
    this.ask = this.ask.bind(this);
  }

  componentWillMount() {
    this.socket = io('http://localhost:4000');
    this.socket.on('connect', this.connect );
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.updateState);
    this.socket.on('joined', this.joined);
    this.socket.on('players', this.updatePlayers);
    this.socket.on('start', this.starter);
    this.socket.on('end', this.updateState);
    this.socket.on('ask', this.ask);
  }

  join(event) {
    console.log('clicked')
    this.emit('join', {
      playerName: this.state.playerName,  
    })
    this.setState({
      viewState: 'players'
    })
    
  }

  start() {
    console.log('start client', this.state.host, this.state.gameName)
    this.emit('start', {
      host: this.state.host, 
      gameName: this.state.gameName
    })
    this.setState({
      viewState: 'hostpage'
    })
  }

   
  onHostChange(e) {
    this.setState({
      host: e.target.value,
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
      playerName: playerName,
    })
  }

  clickJoinHost(event) {
    this.setState({
      hostJoin: true
    })
  }

  clickHostRedirect() {
    this.setState({
      viewState: 'host'
    })
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }

  connect() {
    let player = (sessionStorage.player) ? JSON.parse(sessionStorage.player) : null;
    if (player && player.type === 'player') {
      this.emit('join', player);
      this.setState({viewState: 'players'})
    } else if (player && player.type === 'host') {
      this.emit('start', {host: player.name, gameName:sessionStorage.gameName})
      this.setState({viewState: 'hostpage'})
    }
  	this.setState({
  	  status: 'connected',
  	})
  }

  disconnect() {
  	this.setState({
  	  status: 'disconnected',
      gameName: 'disconnected',
      host: ''
  	})
  }

  updateState(serverState) {
  	this.setState(serverState)
    console.log(serverState)
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

  starter(game) {
    if (this.state.player.type === 'host') {
      sessionStorage.gameName = game.gameName;
    }
    this.setState(game);
  }

  ask(question) {
    this.setState({
      currentQuestion: question
    })
    console.log(this.currentQuestion)
  }

  render() {
  	return (
  	  <div>
        
          <h1> {this.state.gameName} </h1>
          <p> Host: {this.state.host}</p>
          
        
        
          <span>connected</span>
        
      
	      
	      
	     
       {this.state.viewState === 'join' && <TriviaJoin submit={this.join} onNameChange={this.onNameChange} clickHostRedirect={this.clickHostRedirect}/>}
       {this.state.viewState === 'players' && <TriviaPlayers player={this.state.player} currentQuestion={this.state.currentQuestion} players={this.state.players}/>} 
       {this.state.viewState === 'host' && <TriviaHost start={this.start} onHostChange={this.onHostChange} onGameChange={this.onGameChange}/>}
       {this.state.viewState === 'hostpage' && <HostPage players={this.state.players} questions={this.state.questions} emit={this.emit}/>}
      </div>
  	)
  }

}

export default TriviaMain;