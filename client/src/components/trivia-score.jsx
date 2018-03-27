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
      rank: []
    }

  	this.addPlayerRow = this.addPlayerRow.bind(this);
  	this.setRank = this.setRank.bind(this);
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
  }
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
  	  <Container>
        <Row>
          <Col xs="6"><p className="left"> Player: {this.props.player.playerName}</p></Col>
          {this.props.player.type === 'player' && 
            <Col xs="6"><a className="right" href="#" onClick={this.props.playerRedirect}>BACK</a></Col>}
          {this.props.player.type === 'host' && 
            <Col xs="6"><a className="right" href="#" onClick={this.props.hostPageRedirect}>BACK</a></Col>}
        </Row>
  	 <Table striped>
        <thead>
          <tr>
            <th>#</th>
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