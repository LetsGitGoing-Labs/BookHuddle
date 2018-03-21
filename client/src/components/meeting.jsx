import React from 'react';
import { Link } from 'react-router-dom';

class Meeting extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    }
    console.log(props.date);
  }

  render () {
    return (
      <div>
        <div className="meeting-div">
          <p>{this.props.date},</p>
          <p>{this.props.time},</p>
          <p>{this.props.host},</p>
          <p>{this.props.address},</p>
          <p>{this.props.notes}</p>
        </div>
      </div>
      )
  }
}

export default Meeting;