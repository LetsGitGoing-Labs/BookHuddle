// import React from 'react';
// import { Table } from 'reactstrap';

// class Score extends React.Component {
//   render() {
//   	return (
// 	    <Table striped>
// 	    <thead>
// 	      <tr>
// 	        <th>Player Name</th>
// 	        <th>Score</th>
	        
// 	      </tr>
// 	    </thead>
// 	    <tbody>
// 	      <tr>
// 	        <td>Mark</td>
// 	        <td>2</td>
// 	      </tr>
// 	    </tbody>
// 	    </Table>
//   	)
//   }
// }

// export default Score;

import React from 'react';
import { Table, Container, Row, Col } from 'reactstrap';

class Score extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
      rank: [],
      leader: []
    }

  	this.addPlayerRow = this.addPlayerRow.bind(this);
  	this.setRank = this.setRank.bind(this);
  	this.getLeader = this.getLeader.bind(this);
  }

   componentWillMount() {
  	this.setRank();
  }

  componentWillReceiveProps() {
  	this.setRank();
  }
  
  setRank() {
  	if (this.props.score){
  	  let scoreObj = this.props.score;
  	  let keysSorted = Object.keys(scoreObj).sort(function(a,b){return scoreObj[b]-scoreObj[a]})
  	  this.setState({rank: keysSorted})	 
      this.getLeader(keysSorted)
    }

  }

  getLeader(rank) {
  
  	console.log(rank,'line64')
  	let score = this.props.score
  	console.log('line66', score)
    let winner = [];

    for (let i = 1; i < rank.length; i++) {
      winner.push(rank[0])
      console.log('line70', score[rank[0]])
      if (score[rank[i]] === score[winner[0]]) {
      	winner.push(rank[i])
      }
      break;
    }
    this.setState({leader: winner})
  }


  
  addPlayerRow(player, i) {
    let score = this.props.score
    return (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>{player}</td>
        <td>{this.props.score[player]}</td>
      </tr>
    )
  }

  render() {

  	return(
  	  <Container className="score-board">
        <Row>
          <Col xs="6"><p className="left">SCOREBOARD</p></Col>
          {this.props.player.type === 'player' && 
            <Col xs="6"><a className="right" href="#" onClick={this.props.playerRedirect}>BACK</a></Col>}
          {this.props.player.type === 'host' && 
            <Col xs="6"><a className="right" href="#" onClick={this.props.hostPageRedirect}>BACK</a></Col>}
        </Row>
       
         {this.props.gameOver && this.state.leader.length === 1 &&
         <div> The winner is...
         <h1>{this.state.rank[0]}</h1></div>}
         {this.props.gameOver && this.state.leader.length > 1 &&
         <div> Unbelievable...
         <h1>It's a {this.state.leader.length}-way tie!!!</h1></div>}
        
         
       
  	 <Table striped className="score-board">
        <thead >
          <tr>
            <th>Rank</th>
            <th>Player Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
         {this.state.rank.map(this.addPlayerRow)}
       </tbody>
     </Table>
     </Container>
  	)
  }
}

export default Score;