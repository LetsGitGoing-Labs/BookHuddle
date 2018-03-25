import React from 'react';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';
import '../styles/main.css';

class CreateClub extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      clubName: '',
      description: '',
      clubCity: '',
      genre: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let target = e.target.name;
    this.setState ({
      [ target ]: e.target.value
    });
  }

  onSelect(e) {
    let target = e.target.options;
    this.setState({
      genre: target[e.target.selectedIndex].text
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = this.state;
    $.ajax({
      type: 'POST',
      url: '/clubs',
      data: formData,
      success: (data) => {
        console.log(data.confirmRequest)
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  render() {
    return (
      <div id="create-club-form" className="col-md-9">
        <div className="container">
          <h1 className="centerize">Create a Club</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input type="text" className="form-control" id="inputClubName" placeholder="Club name" name="clubName" value={this.state.clubName} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <textarea className="form-control" id="inputClubDescription" rows="3" name="description" placeholder="Add a brief description to attract club members"value={this.state.description} onChange={this.onChange}></textarea>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="inputClubLocation" placeholder="City" name="clubCity" value={this.state.clubCity} onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <select className="form-control" id="inputClubGenres" name="genre"  onChange={this.onSelect.bind(this)}>
                <option disabled defaultValue>Choose a Genre</option>
                <option>Fantasy</option>
                <option>Thrillers</option>
                <option>Historical Fiction</option>
                <option>Mystery</option>
                <option>Non-Fiction</option>
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