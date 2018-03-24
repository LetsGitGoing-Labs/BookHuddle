import React from 'react';
import CurPlayers from './trivia-curplayers.jsx';
import Questions from './trivia-qs.jsx';


class HostPage extends React.Component {
  constructor(props) {
    super(props);
  
    
  }

  render() {
  	return (
    <div>
      <h1>Questions</h1>
      <h1>Players</h1>
      <CurPlayers players={this.props.players}/>
      <Questions questions={this.props.questions} emit={this.props.emit}/>
    </div>
  	)
  }
}
  export default HostPage;