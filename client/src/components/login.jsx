import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    let target = e.target.name;
    this.setState ({
      [ target ]: e.target.value
    });
  }
  handleSubmit (e) {
    e.preventDefault();
    console.log('submitted');
    this.props.auth(() => {
      this.setState({
        isLoggedIn: true
      });
      console.log('logged in');
    });
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Redirect to='/dashboard' />)
    }
    return (
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
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
