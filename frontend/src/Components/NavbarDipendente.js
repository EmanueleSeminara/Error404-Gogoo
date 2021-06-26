import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import Axios from 'axios';

export default class NavbarDipendente extends Component {

  state = {
    isOpen: false,
  }

  logout = () => {
    window.localStorage.clear();
    Axios.post('/api/user/logout')
      .then((res) => {
        window.location.href = '/login';
      }).catch((err) => {
        if (err.response.status === 401) {
          window.location.href = '/login';
        } else {
          window.location.href = '/errorServer';
        }
      });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  };


  render() {
    return (
      <div>
        <Navbar light expand="md" style={{ backgroundColor: "#112f40" }} >
          <NavbarBrand href="/" style={{ color: "white" }}>GoGoo!</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav style={{ color: "white" }}>
                  Gestione Accout
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <a href="/modificaPassword" style={{ textDecoration: "none" }}>Modifica password</a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Button onClick={() => this.logout()} style={{ color: "white", backgroundColor: "transparent", border: "none" }}>Logout</Button>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}