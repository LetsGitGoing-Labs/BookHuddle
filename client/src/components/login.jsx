import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';



class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.checkLoginState = this.checkLoginState.bind(this);
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }
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
            <FacebookLogin
              appId="174422809852795"
              autoLoad={true}
              fields="name,email,picture"
              onClick= {this.checkLoginState} />
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