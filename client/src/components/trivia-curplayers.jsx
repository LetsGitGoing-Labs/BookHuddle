import React from 'react';
import { Table } from 'reactstrap';

class CurPlayers extends React.Component {
  constructor(props) {
  	super(props);
  	this.addPlayerRow = this.addPlayerRow.bind(this);
  }
  
  addPlayerRow(player, i) {
    return (
      <tr key={i}>
        <th scope="row">{i + 1}</th>
        <td>{player.playerName}</td>
        <td>{this.props.score.player}</td>
      </tr>
    )
  }

  render() {
  	return(
  	 <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Player Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {this.props.players.map(this.addPlayerRow)}
       </tbody>
     </Table>
  	)
  }
}

export default CurPlayers;