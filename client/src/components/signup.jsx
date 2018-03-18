import React from 'react';


class Signup extends React.Component {
  render() {
    return (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>First name</label>
            <input type="text" className="form-control" id="inputFirstName" placeholder="First name"/>
          </div>
          <div className="form-group col-md-6">
            <label>Last name</label>
            <input type="text" className="form-control" id="inputLastName" placeholder="Last name"/>
          </div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" id="inputEmail" placeholder="Email"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="text" className="form-control" id="inputPassword" placeholder="Password"/>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="form-group col-md-4">
            <label>State</label>
            <select id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

export default Signup;