import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, ButtonGroup, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Media } from 'reactstrap';
import Login from './login.jsx';
import Signup from './signup.jsx';
import { Link, Redirect } from 'react-router-dom';

class LoginModal extends React.Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	  modal: true,
  	  login: true,
  	  signup: false
  	}
  	this.toggle = this.toggle.bind(this);
  	this.clickLogin = this.clickLogin.bind(this);
  	this.clickSignup = this.clickSignup.bind(this);
  }
   toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  clickLogin() {
  	this.setState({
  	  login: !this.state.login
  	})
  }

   clickSignup() {
  	this.setState({
  	  login: !this.state.signup
  	})
  }

  render() {
  	 if (!this.state.modal) {
      return (<Redirect to='/' />)
    }

    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalBody>
	        {this.state.login && <Login modal={this.state.modal}/>}
	        {!this.state.login && <Signup/>}
        </ModalBody>
      </Modal>
    )
  }
}

export default LoginModal;