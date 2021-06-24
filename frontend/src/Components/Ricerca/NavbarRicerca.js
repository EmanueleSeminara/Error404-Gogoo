import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Axios from 'axios';

const logout = () => {
  window.localStorage.clear();
  Axios.post('/api/user/logout')
  .then((res) => {
    window.location.href='/login';
  }).catch((err) => {
    if(err.response.status === 401){
      window.location.href='/login';
    } else {
      window.location.href='/errorServer';
    }
  });
};

const links = [
  { href: '/pannelloGestioneAccount', onClick: {}, text: 'Gestione Account' },
  { href: '/pannelloGestionePrenotazione', onClick: {}, text: 'Gestione Prenotazioni' },
  { href: '#', onClick: logout, text: 'LOGOUT' }
];

const createNavItem = ({ href, text, className, onClick }) => (
  <NavItem>
    <NavLink style={{ color: "white" }} onClick={onClick} href={href} className={className}>{text}</NavLink>
  </NavItem>
);

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar style={{ borderRadius: "0", justifyContent: "flex-end",  backgroundColor: "#334c67" }} light expand="md">
          <NavbarBrand style={{ color: "white" }}>GOGOO!</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {links.map(createNavItem)}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}



/* import React, { useState } from "react";

import 'bootstrap/dist/js/bootstrap.min.js'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';




function NavbarRicerca() {
  return (
    <div className="pos-f-t">
      <div className="collapse" id="navbarToggleExternalContent">

        <div className="bg-dark p-4">
          <h4 className="text-white">Collapsed content</h4>
          <span className="text-muted">Toggleable via the navbar brand.</span>
          <a
            className="navbar-brand glacialReg"
            href="/pannelloGestioneAccount"
            style={{ fontSize: "30px" }}>
            GooGoo!
          </a>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark" style={{borderRadius: "0", justifyContent: "flex-end"}}>

      <button type="button" style={{justifyContent: "start"}}>
      <ChevronLeftIcon style={{ fontSize: 40, color: "#969696", marginRight: "20px"}}  />
      </button>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">

          <span className="navbar-toggler-icon"></span>
        </button>
      </nav>
    </div>
  );
}

export default NavbarRicerca;
 */