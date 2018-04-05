import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Nav, NavLink, NavItem, TabPane, TabContent } from 'reactstrap';
import classnames from 'classnames';
import Login from './login.jsx';
import Signup from './signup.jsx';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: this.props.modal,
    };
  }

  render() {
    const externalCloseBtn = <button className="close" onClick={this.toggle}>x</button>;

    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} external={externalCloseBtn} centered>
          <ModalBody id="modal">
            <Nav tabs>
              <NavItem
                className={` ${classnames({ active: this.props.activeTab === 'login' })} modal-tab`}
              >
                <NavLink
                  onClick={() => { this.props.toggleTab('login'); }}
                >
                    Login
                </NavLink>
              </NavItem>
              <NavItem
                className={` ${classnames({ active: this.props.activeTab === 'signup' })} modal-tab`}
              >
                <NavLink
                  onClick={() => { this.props.toggleTab('signup'); }}
                >
                    New Account
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.props.activeTab}>
              <TabPane tabId="login">
                <Login
                  login={this.props.login}
                  isLoggedIn={this.props.isLoggedIn}
                />
              </TabPane>
              <TabPane tabId="signup">
                <Signup
                  signup={this.props.signup}
                  isLoggedIn={this.props.isLoggedIn}
                />
              </TabPane>
            </TabContent>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default LoginModal;
