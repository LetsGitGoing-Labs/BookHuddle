import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import Signup from './signup.jsx';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false,
      signup: false,
      errMsg: '',
      userResponseData: ''
    };

    this.onChange = this.onChange.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.signupView = this.signupView.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      console.log(response);
      statusChangeCallback(response);
    });
  }

  signupView() {
    this.setState({
      signup: true
    })
  }

  onChange(e) {

    let target = e.target.name;
    this.setState ({
      errMsg: '',
      [ target ]: e.target.value
    });
  }


  handleSubmit (e) {
    e.preventDefault();
    let data = {
      email: this.state.email,
      password: this.state.password
    };

    $.ajax({
      url: '/login',
      type: 'POST',
      data: data,
      success: (data) => {
        this.setState({
          userResponseData: data,
          isLoggedIn: true
        });
      },
      error: (err) => {
        console.log('errror in ajax', err);
        this.setState({
          email: '',
          password: '',
          errMsg: 'User not found'});
      }
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (
          <Redirect to= {{
            pathname: '/dashboard',
            state: { userResponseData: this.state.userResponseData }
            }} />)
    }

    return (
      <div>
        {this.state.signup && <Signup />}
        {!this.state.signup &&
        <div  className="centerize">
          <form>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="inputEmail3"
                placeholder="Email"
                name="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.onChange}/>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="login-password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this.onChange}/>
            </div>
              {this.state.errMsg.length > 1 && <div id="login-err"><p>{this.state.errMsg}</p></div>}
            <div className="form-group">
              <Link to='/dashboard'>
                <button id="button1" type="submit" onClick={this.handleSubmit}>Login
                </button>
              </Link>
              <a href="/auth/facebook" className="btn btn-primary"><span className="fa fa-facebook"></span> Facebook</a>
            </div>
          </form>
        </div>
      }
      </div>
    );
  }
}

export default Login;
