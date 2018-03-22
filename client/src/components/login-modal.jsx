import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Nav, NavLink, NavItem, TabPane, TabContent } from 'reactstrap';
import classnames from 'classnames';
import Login from './login.jsx';
import Signup from './signup.jsx';
import { Link, Redirect } from 'react-router-dom';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleTab(tab) {
    this.setState({
      activeTab: tab
    })
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className} centered={true}>
          <ModalBody>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === 'login' })}
                    onClick={() => { this.toggleTab('login'); }}
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === 'signup' })}
                    onClick={() => { this.toggleTab('signup'); }}
                  >
                    New Account
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="login">
                  <Login />
                </TabPane>
                <TabPane tabId="signup">
                  <Signup />
                </TabPane>
              </TabContent>
            </div>

          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default LoginModal;