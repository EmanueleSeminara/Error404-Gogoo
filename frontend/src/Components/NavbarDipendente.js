import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import Axios from 'axios';

export default class NavbarDipendente extends Component {

  state = {
    isOpen: false,
    home: ""
  }

  componentDidMount() {
    let c = JSON.parse(localStorage.getItem("utente"))
    switch (c.role) {
      case "admin":
        this.setState({ home: "/pannelloAmministratore" });
        break;
      case "driver":
        this.setState({ home: "/pannelloAutista" });
        break;
      case "valet":
        this.setState({ home: "/pannelloParcheggiatore" });
        break;
      default:
        this.setState({ home: "#" });
    }
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
        <Navbar light expand="md" style={{ backgroundColor: "#39304d" }} fixed="top" Z >
          <NavbarBrand href="/" style={{ color: "white" }}>dropcar</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Button href={this.state.home} style={{ color: "white", backgroundColor: "transparent", border: "none" }}>Home</Button>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav style={{ color: "white" }}>
                  Gestione Account
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