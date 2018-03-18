import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  render() {
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <Link to='/dashboard'>
              <button type="submit" className="btn btn-primary">Sign in</button>
            </Link>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;

<form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <Link to='/dashboard'>
              <button type="submit" className="btn btn-primary">Sign in</button>
            </Link>
          </div>
        </div>
      </form>