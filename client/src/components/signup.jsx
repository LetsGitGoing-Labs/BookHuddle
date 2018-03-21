import React from 'react';
import $ from 'jquery';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      city: '',
      state: '',
      isLoggedIn: false
    }
    this.change = this.change.bind(this);
    this.signupSubmit = this.signupSubmit.bind(this);
  }

  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    })  
  }

  signupSubmit(event) {
    event.preventDefault();
    var formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      city: this.state.city,
      state: this.state.state
    }
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: formData,
      success: function(data) {
        console.log(  'logged in')
      },
      error: function(err){
        console.log('errror in ajax', err);
      }
    });
    this.setState({
      
      isLoggedIn: true
    })
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Redirect to='/dashboard' />)
    }
    return (
      <form >
        <h1 className="centerize"> Create an Account </h1>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>First name</label>
            <input name="firstName" onChange={event => this.change(event)} type="text" className="form-control" id="inputFirstName" placeholder="First name"/>
          </div>
          <div className="form-group col-md-6">
            <label>Last name</label>
            <input name="lastName" onChange={event => this.change(event)} type="text" className="form-control" id="inputLastName" placeholder="Last name"/>
          </div>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" onChange={event => this.change(event)} type="email" className="form-control" id="inputEmail" placeholder="Email"/>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input name="password" onChange={event => this.change(event)} type="password" className="form-control" id="inputPassword" placeholder="Password"/>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label>City</label>
            <input name="city" onChange={event => this.change(event)} type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="form-group col-md-4">
            <label>State</label>
            <select name="state" onChange={event => this.change(event)} id="inputState" className="form-control">
              <option selected>Choose...</option>
              <option>...</option>
              <option>CA</option>
              <option>CO</option>
              <option>TX</option>
              <option>CANADA</option>
            </select>
          </div>
        </div>
        <div className="centerize">
        <button onClick={this.signupSubmit} type="submit" className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    );
  }
}

export default Signup;