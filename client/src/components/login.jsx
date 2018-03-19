import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Link, Redirect } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    }
    this.onChange = this.onChange.bind(this);
    this.checkLoginState = this.checkLoginState.bind(this);
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  onChange(e) {
    let target = e.target.name;
    this.setState ({
      [ target ]: e.target.value
    });
  }
  handleSubmit (e) {
    e.preventDefault();
    this.props.auth(() => {
      this.setState({
        isLoggedIn: true
      });
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Redirect to='/dashboard' />)
    }
    return (
      <div>
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" name="email" value={this.state.email} onChange={this.onChange}/>
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword" placeholder="Password" name="password" value={this.state.password} onChange={this.onChange}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <input type="submit" className="btn btn-primary" value="Sign in" />
            <FacebookLogin
              appId="174422809852795"
              autoLoad={true}
              fields="name,email,picture"
              onClick= {this.checkLoginState} />
          </div>
        </div>
      </form>
      </div>
    );
  }
}

export default Login;
