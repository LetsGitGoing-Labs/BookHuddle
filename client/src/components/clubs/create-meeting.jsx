import React from 'react';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import AlgoliaPlaces from 'algolia-places-react';

class CreateMeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meetingName: '',
      description: '',
      location: '',
    };
    this.onChange = this.onChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  onChange(e) {
    const target = e.target.name;
    this.setState({
      [target]: e.target.value,
    });
  }

  setLocation(e) {
    this.setState({
      location: (`${e.suggestion.name}, ${e.suggestion.administrative}`),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const clubData = JSON.stringify(this.state);
  }

  render() {
    return (
      <div id="create-meeting" className="col-md-9">
        <div className="container cent">
          <h3>Create New Meeting</h3>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input type="text" className="form-control" id="meeting-name" placeholder="Meeting Name" name="meetingName" value={this.state.meetingName} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <textarea className="form-control" id="inputClubDescription" rows="3" name="description" placeholder="Add a brief description to inform club members"value={this.state.description} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <AlgoliaPlaces placeholder="Meeting address" onChange={e => this.setLocation(e)} />
            </div>
            <input type="submit" className="btn btn-primary centered" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateMeeting;
