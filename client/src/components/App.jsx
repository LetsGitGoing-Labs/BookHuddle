import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from './home/home.jsx';
import About from './home/about.jsx';
import Logout from './home/logout.jsx';
import DashboardRouting from './dashboard/dashboard-routing.jsx';

import '../styles/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: true
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      console.log(response);
      statusChangeCallback(response);
    });
  }

  handleLogin(formData, cb) {

    formData = JSON.stringify(formData);
    let query = `mutation HandleLogin($formData: String) {
      handleLogin(userData: $formData)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      data: JSON.stringify({
        query: query,
        variables: { formData : formData }
      }),
      contentType: 'application/json',
      success: (data) => {
        // this.setState({
        //   user: data,
        //   isLoggedIn: true
        // });
      },
      error: (err) => {
        console.log('errror logging in', err);
        cb(err);
      }
    });
  }

  handleSignup(formData, cb) {
    $.ajax({
      url: '/signup',
      type: 'POST',
      data: formData,
      success: (data) => {
        this.setState({
          user: data,
          isLoggedIn: true
        });
      },
      error: function(err){
        console.log('error in ajax', err);
        cb(err);
      }
    });
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false
    });
    console.log('logged out');
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact path='/'
            render={
              (props) => {
                return <Home {...props}
                  login={this.handleLogin}
                  signup={this.handleSignup}
                  isLoggedIn={this.state.isLoggedIn}
                />
              }
            } />
          <Route path='/about' component={ About } />
          <Route path='/logout' render={ (props) => (
            <Logout handleLogout={this.handleLogout} />
           )} />
          <Route path='/dashboard' render={
            (props) => {
              return this.state.isLoggedIn
              ? <DashboardRouting user={this.state.user} />
              : <Redirect to={{
                  pathname: "/nologin",
                  state: { from: props.location }
                }}
              />
            }}
          />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

const NotFound = ({ location }) => (
  <div>
    <h2>Sorry could not find <code>{ location.pathname }</code></h2>
  </div>
)

export default App