import React from 'react';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import { Badge, Container, Row, Col } from 'reactstrap';
import io from 'socket.io-client';
import TriviaPlayers from './trivia-players.jsx';
import TriviaHost from './trivia-host.jsx';
import Score from './trivia-score.jsx';
import TriviaJoin from './trivia-join.jsx';
import HostPage from './trivia-hostpage.jsx';
import '../styles/trivia.css';

class TriviaMain extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
      gameName: '',
      status: 'disconnected',
      playerName: '',
      player: {},
      players: [],
      host: '',
      viewState: 'join',
      questions: [],
      currentQuestion: false,
      results: undefined,
      score: {},
      gameOver: false,
  	};

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
    this.hostPageRedirect = this.hostPageRedirect.bind(this);
    this.onGameChange = this.onGameChange.bind(this);
    this.clickHostRedirect = this.clickHostRedirect.bind(this);
    this.starter = this.starter.bind(this);
    this.ask = this.ask.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.scoreRedirect = this.scoreRedirect.bind(this);
    this.playerRedirect = this.playerRedirect.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }

  componentWillMount() {
    this.socket = io('http://localhost:4000');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.updateState);
    this.socket.on('joined', this.joined);
    this.socket.on('players', this.updatePlayers);
    this.socket.on('start', this.starter);
    this.socket.on('end', this.updateState);
    this.socket.on('ask', this.ask);
    this.socket.on('results', this.updateResults);
    this.socket.on('score', this.updateScore);
    this.socket.on('gameover', this.gameOver);
  }

  join(event) {
    this.emit('join', {
      playerName: this.state.playerName,
    });
    this.setState({
      viewState: 'players',
    });
  }

  start() {
    console.log('start client', this.state.host, this.state.gameName);
    this.emit('start', {
      host: this.state.host,
      gameName: this.state.gameName,
    });
    this.setState({
      viewState: 'hostpage',
    });
  }


  onHostChange(e) {
    this.setState({
      host: e.target.value,
    });
  }

  onGameChange(e) {
    this.setState({
      gameName: e.target.value,
    });
  }

  onNameChange(playerName) {
    console.log(event);
    this.setState({
      playerName: playerName.toUpperCase(),
    });
  }

  hostPageRedirect() {
    this.setState({
      viewState: 'hostpage',
    });
  }

  clickHostRedirect() {
    this.setState({
      viewState: 'host',
    });
  }

  scoreRedirect() {
    this.setState({
      viewState: 'score',
    });
  }

  playerRedirect() {
    this.setState({
      viewState: 'players',
    });
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }

  connect() {
    const player = (sessionStorage.player) ? JSON.parse(sessionStorage.player) : null;
    if (player && player.type === 'player') {
      this.emit('join', player);
      this.setState({ viewState: 'players' });
    } else if (player && player.type === 'host') {
      this.emit('start', { host: player.name, gameName: sessionStorage.gameName });
      this.setState({ viewState: 'hostpage' });
    }
  	this.setState({
  	  status: 'connected',
  	});
  }

  disconnect() {
  	this.setState({
  	  status: 'disconnected',
      gameName: 'disconnected',
      host: '',
  	});
  }

  gameOver(score) {
    console.log('game over', score);
    this.setState({
      gameOver: true,
      currentQuestion: false,
    });
    this.scoreRedirect();
  }

  updateState(serverState) {
  	this.setState(serverState);
    console.log(serverState);
  }

  joined(player) {
    sessionStorage.player = JSON.stringify(player);
    this.setState({
      player,
    });
  }

  updatePlayers(newPlayer) {
    this.setState({
      players: newPlayer,
    });
  }

  updateScore(score) {
    this.setState({
      score,
    });
  }

  starter(game) {
    if (this.state.player.type === 'host') {
      sessionStorage.gameName = game.gameName;
    }
    this.setState(game);
  }

  ask(question) {
    sessionStorage.answer = '';
    this.setState({
      currentQuestion: question,
    });
    console.log(this.currentQuestion);
  }

  updateResults(data) {
    console.log('update results', data, this.state.player, this.state.playerName);
    this.setState({ results: data });
  }


  render() {
    const player = this.state.player.playerName;
  	return (
    <Container id="trivia">
      <Row id="title">
        <Col xs="12">{this.state.gameName}<span data-toggle="tooltip" data-placement="left" title={this.state.status} className={this.state.status} /></Col>
        <Col xs="8">
          <p className="title-sub"> Host: {this.state.host}</p>
        </Col>
        <Col xs="4">
          <p className="title-sub right">Players: {this.state.players.length}</p>
        </Col>
      </Row>
      <div>
        {this.state.viewState === 'join' && <TriviaJoin submit={this.join} onNameChange={this.onNameChange} host={this.state.host} clickHostRedirect={this.clickHostRedirect} />}
        {this.state.viewState === 'players' && <TriviaPlayers scoreRedirect={this.scoreRedirect} score={this.state.score} player={this.state.player} currentQuestion={this.state.currentQuestion} results={this.state.results} players={this.state.players} emit={this.emit} />}
        {this.state.viewState === 'host' && <TriviaHost start={this.start} onHostChange={this.onHostChange} onGameChange={this.onGameChange} />}
        {this.state.viewState === 'hostpage' && <HostPage gameOver={this.gameOver} scoreRedirect={this.scoreRedirect} players={this.state.players} questions={this.state.questions} emit={this.emit} score={this.state.score} />}
        {this.state.viewState === 'score' && <Score gameOver={this.state.gameOver} hostPageRedirect={this.hostPageRedirect} playerRedirect={this.playerRedirect} players={this.state.players} player={this.state.player} questions={this.state.questions} score={this.state.score} results={this.state.results} emit={this.emit} />}
      </div>     
    </Container>
  	);
  }
}

export default TriviaMain;
