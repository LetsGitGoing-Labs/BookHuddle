
import $ from 'jquery';
import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AlgoliaPlaces from 'algolia-places-react';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      location: '',
    };
    this.change = this.change.bind(this);
    this.signupSubmit = this.signupSubmit.bind(this);
    this.location = this.location.bind(this);
  }

  change(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  location(event) {
    console.log('line 31', event);
    this.setState({
      location: (`${event.suggestion.name}, ${event.suggestion.administrative}`),
    });
  }

  signupSubmit(e) {
    e.preventDefault();
    const formData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      location: this.state.location,
    };

    this.props.signup(formData, (err) => {
      console.log('error signing in:', err);
    });
  }

  render() {
    if (this.props.isLoggedIn) {
      <Redirect to="/dashboard" />;
    }
    return (
      <form >
        <div className="form-row">
          <div className="form-group col-md-6">
            <input name="firstName" onChange={event => this.change(event)} type="text" className="form-control" id="inputFirstName" placeholder="First name" />
          </div>
          <div className="form-group col-md-6">
            <input name="lastName" onChange={event => this.change(event)} type="text" className="form-control" id="inputLastName" placeholder="Last name" />
          </div>
        </div>
        <div className="form-group">
          <input name="email" onChange={event => this.change(event)} type="email" className="form-control" id="inputEmail" autoComplete="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <input name="password" onChange={event => this.change(event)} type="password" className="form-control" autoComplete="current-password" id="inputPassword" placeholder="Password" />
        </div>
        <div className="form-group">
          <AlgoliaPlaces placeholder="Location by city" onChange={event => this.location(event)} />
        </div>
        <div className="centered">
          <button onClick={this.signupSubmit} type="submit" className="modal-btn btn">Sign Up</button>
        </div>
      </form>
    );
  }
}

export default Signup;
