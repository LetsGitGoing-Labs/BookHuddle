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
      isLoggedIn: false,
    };
    this.checkLoginState = this.checkLoginState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      console.log(response);
      statusChangeCallback(response);
    });
  }

  getUserData(email) {
    const query = `mutation GetUserData($email: String) {
      getUserData(userEmail: $email)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      data: JSON.stringify({
        query,
        variables: { email },
      }),
      contentType: 'application/json',
      success: (userData) => {
        userData = JSON.parse(userData.data.getUserData);
        if (userData) {
          this.setState({
            user: userData,
          });
        }
      },
    });
  }

  handleLogin(formData, cb) {
    formData = JSON.stringify(formData);
    const query = `mutation HandleLogin($formData: String) {
      handleLogin(userData: $formData)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      data: JSON.stringify({
        query,
        variables: { formData },
      }),
      contentType: 'application/json',
      success: (userData) => {
        userData = JSON.parse(userData.data.handleLogin);
        if (userData) {
          this.setState({
            user: userData,
            isLoggedIn: true,
          });
        } else {
          cb();
        }
      },
      error: (err) => {
        console.log('error logging in', err);
        cb(err);
      },
    });
  }

  handleSignup(formData, cb) {
    formData = JSON.stringify(formData);

    const query = `mutation HandleSignup($formData: String) {
      handleSignup(userData: $formData)
    }`;

    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          formData,
        },
      }),
      success: (userData) => {
        console.log(userData);
        this.setState({
          user: JSON.parse(userData.data.handleSignup),
          isLoggedIn: true,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
    });
    console.log('logged out');
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={
              props => (<Home
                {...props}
                login={this.handleLogin}
                signup={this.handleSignup}
                isLoggedIn={this.state.isLoggedIn}
              />)
            }
            />
          <Route path="/about" component={About} />
          <Route
            path="/logout"
            render={props => (
              <Logout handleLogout={this.handleLogout} />
           )}
          />
          <Route
            path="/dashboard"
            render={
            props => (this.state.isLoggedIn
              ? <DashboardRouting user={this.state.user} getUserData={this.getUserData} />
              : <Redirect to={{
                  pathname: '/nologin',
                  state: { from: props.location },
                }}
              />)}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const NotFound = ({ location }) => (
  <div>
    <h2>Sorry could not find <code>{ location.pathname }</code></h2>
  </div>
);

export default App;
