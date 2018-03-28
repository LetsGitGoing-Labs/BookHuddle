import React from 'react';
import { DateTime } from 'luxon';

class DateCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      month: '',
      time: '',
      year: ''
    }
  }

  componentDidMount() {
    let date = DateTime.fromISO("2018-04-30T21:00:00").toFormat('yyyy LLL dd t').split(' ');
    let time = date[3] + ' ' + date[4];
    this.setState({
      date: date[2],
      month: date[1],
      time: time,
      year: date[0]
    });
  }

  render() {
    return (
      <div class="date-panel">
        <p>{this.state.year}</p>
        <h2>{this.state.date}</h2>
        <p>{this.state.month}</p>
        <h6>{this.state.time}</h6>
      </div>
    )
  }
}

export default DateCard;