import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Nav, NavLink, NavItem, TabPane, TabContent } from 'reactstrap';
import classnames from 'classnames';
import Login from './login.jsx';
import Signup from './signup.jsx';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
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
=======
      modal: this.props.modal
    };
>>>>>>> Render modal without changing page
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className} centered={true}>
          <ModalBody>
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.props.activeTab === 'login' })}
                    onClick={() => { this.props.toggleTab('login'); }}
                  >
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.props.activeTab === 'signup' })}
                    onClick={() => { this.props.toggleTab('signup'); }}
                  >
                    New Account
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.props.activeTab}>
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