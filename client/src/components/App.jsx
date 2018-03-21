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

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/about' component={ About } />
          <Route path='/faq' component={ FAQ } />
          <Route path='/login-modal' component={ LoginModal } />
          <Route path='/signup' component={ Signup } />
          <Route path='/login' component={ Login } />
          <Route path='/dashboard' component={ Dashboard } />
          <Route path='/logout' component={ Logout } />
          <Route path='/create-club' component={ CreateClub } />
          <Route path='/profile' component={ Profile } />
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