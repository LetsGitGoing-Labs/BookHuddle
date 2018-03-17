import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Home from './home.jsx';
import About from './about.jsx';
import FAQ from './faq.jsx';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';
import Logout from './logout.jsx';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>BookHuddle</h1>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>Our Team</Link></li>
          <li><Link to='/faq'>FAQ</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </ul>

        <hr/>

        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/about' component={ About } />
          <Route path='/faq' component={ FAQ } />
          <Route path='/signup' component={ Signup } />
          <Route path='/login' component={ Login } />
          <Route path='/dashboard' component={ Dashboard } />
          <Route path='/logout' component={ Logout } />
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