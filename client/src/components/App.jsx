import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './home.jsx';
import About from './about.jsx';
import FAQ from './faq.jsx';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';
import Logout from './logout.jsx';
import '../styles/main.css';
import CreateClub from './create-club.jsx';
import Profile from './profile.jsx';
import LoginModal from './login-modal.jsx';
import MainNavbar from './main-navbar.jsx';
import Club from './club.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isLoggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(formData, cb) {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: formData,
      success: (data) => {
        this.setState({
          user: data,
          isLoggedIn: true
        });
      },
      error: (err) => {
        console.log('errror logging in', err);
        cb(err);
      }
    });
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
                  login={this.handleLogin.bind(this)}
                  isLoggedIn={this.state.isLoggedIn}
                />
              }
            } />
          <Route path='/about' component={ About } />
          <Route path='/faq' component={ FAQ } />
          <Route path='/logout' component={ Logout } />
          <Route path='/create-club' component={ CreateClub } />
          <Route path='/profile' component={ Profile } />
          <Route path='/club' component={ Club } />
          <Route path='/dashboard' render={
            (props) => {
              return this.state.isLoggedIn
              ? <Dashboard />
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