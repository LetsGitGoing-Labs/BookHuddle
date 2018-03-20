import React from 'react';
import $ from 'jquery';

class CreateClub extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      clubName: '',
      description: '',
      clubCity: '',
      genre: ''
    }
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
    $.ajax({
      type: 'POST',
      url: '/clubs',
      data: this.state,
      success: (data) => {
        console.log(data);
      },
      error: (data) => {
        console.log(data);
      }
    });
  }

  render() {
    return (
      <div>
        <h1>Create a Club</h1>
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
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateClub;