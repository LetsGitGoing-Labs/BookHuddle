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
    this.props.createNewClub(formData);
    this.props.toggleModal();
  }

  render() {
    const externalCloseBtn = <button className="close" onClick={this.toggle}>x</button>;

    return (
      <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} >
        <ModalBody>
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
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateClub;