import React from 'react';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import AlgoliaPlaces from 'algolia-places-react';

class CreateClub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubName: '',
      description: '',
      clubCity: '',
      genre: '',
      userID: this.props.userID,
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
      clubCity: (`${e.suggestion.name}, ${e.suggestion.administrative}`)
    });
  }

  onSelect(e) {
    const target = e.target.options;
    this.setState({
      genre: target[e.target.selectedIndex].text,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const clubData = JSON.stringify(this.state);
    const query = `mutation HandleClubCreate($clubData: String) {
      handleClubCreate(clubData: $clubData)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          clubData,
        },
      }),
      success: (data) => {
        console.log('success')
        this.setState({
          isSubmitted: true
        });
      },
      error: (data) => {
        console.log(data);
      },
    });
  }

  render() {
    return this.state.isSubmitted ? (<Redirect to='/dashboard' />) :
    (
      <div id="create-club-form" className="col-md-9">
        <div className="container">
          <h1 className="centerize">Create a Club</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input type="text" className="form-control" id="inputClubName" placeholder="Club name" name="clubName" value={this.state.clubName} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <textarea className="form-control" id="inputClubDescription" rows="3" name="description" placeholder="Add a brief description to attract club members"value={this.state.description} onChange={this.onChange} />
            </div>
            <div className="form-group">
              <AlgoliaPlaces placeholder="Location by city" onChange={e => this.setLocation(e)} />
            </div>
            <div className="form-group">
              <select className="form-control" id="inputClubGenres" name="genre" onChange={this.onSelect.bind(this)}>
                <option disabled defaultValue>Choose a Genre</option>
                <option>Fantasy</option>
                <option>Thrillers</option>
                <option>Historical Fiction</option>
                <option>Mystery</option>
                <option>Non-Fiction</option>
                <option>Variety</option>
              </select>
            </div>
            <input type="submit" className="btn btn-primary centerize" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateClub;
