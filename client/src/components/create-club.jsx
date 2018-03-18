import React from 'react';

class CreateClub extends React.Component {
  render() {
    return (
      <div>
        <h1>Create a Club</h1>
        <form>
          <div className="form-group">
            <label>Club Name</label>
            <input type="text" className="form-control" id="inputClubName" placeholder="Club name"/>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" id="inputClubDescription" rows="3"></textarea>
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" className="form-control" id="inputClubLocation" placeholder="San Diego"/>
          </div>
          <div className="form-group">
            <label >Genre</label>
            <select className="form-control" id="inputClubGenres">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateClub;