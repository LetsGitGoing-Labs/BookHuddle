import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from './home.jsx';
import About from './about.jsx';
import FAQ from './faq.jsx';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';
import Logout from './logout.jsx';
import MainNavbar from './main-navbar.jsx';

const NotFound = ({ location }) => (
  <div>
    <h2>Sorry could not find <code>{ location.pathname }</code></h2>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
    this.authenticate = this.authenticate.bind(this);
  }

  authenticate (cb) {
    this.setState({
      isAuthenticated: true
    });
    setTimeout(cb, 100);
  }

  render() {
    return (
      <div>
        <MainNavbar />
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/about' component={ About } />
          <Route path='/faq' component={ FAQ } />
          <Route path='/signup' component={ Signup } />
          <Route path='/logout'component={ Logout } />
          <Route
            path='/login'
            render={
              (props) => (
                <Login {...props} auth={this.authenticate} />
              )
            }
          />
          <Route
            path='/dashboard'
            render={
              (props) => (
                this.state.isAuthenticated ?  <Dashboard {...props}/> :
                <Redirect to='/login'/>
              )
            }
          />
          <Route component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App