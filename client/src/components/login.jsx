import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    // $.ajax({
    //   type:'POST',
    //   url: '/login',
    //   data: {
    //     email: this.state.email,
    //     password: this.state.password
    //   },
    //   success: (data) => {
    //     this.setState({
    //       isLoggedIn: true
    //     });
    //   },
    //   error: (data) => {
    //     console.log(data);
    //   }
    // });

    console.log('submitted', this.state)
  }

  render() {
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
