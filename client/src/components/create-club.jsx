import React from 'react';
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class CreateClub extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      clubName: '',
      description: '',
      clubCity: '',
      genre: '',
      modal: true,
      clubResponseData: ''
    };
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      clubName: this.state.clubName,
      description: this.state.description,
      clubCity: this.state.clubCity,
      genre: this.state.genre
    }

    $.ajax({
      type: 'POST',
      url: '/clubs',
      data: data,
      success: (data) => {
        this.toggle();
        this.setState({
          clubResponseData: data
        });
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  render() {
     if (!this.state.modal) {
      return (<Redirect to='/dashboard' />)
    }
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalBody>
      <div>
        <h1 className="centerize">Create a Club</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Club Name</label>
            <input type="text" className="form-control" id="inputClubName" placeholder="Club name" name="clubName" value={this.state.clubName} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" id="inputClubDescription" rows="3" name="description" value={this.state.description} onChange={this.onChange}></textarea>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" className="form-control" id="inputClubLocation" placeholder="San Diego" name="clubCity" value={this.state.clubCity} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label >Genre</label>
            <select className="form-control" id="inputClubGenres" name="genre"  onChange={this.onSelect.bind(this)}>
              <option disabled selected>Choose a Genre</option>
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
       </ModalBody>
      </Modal>
    );
  }
}

export default CreateClub;