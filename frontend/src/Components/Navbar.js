/* import React, { Component } from "react";

import 'bootstrap/dist/js/bootstrap.min.js';

export default class Navbar extends Component {

  render() {
    return (
      <nav 
        className="navbar navbar-expand-sm navbar-dark justify-content-end fixed-top"
        style={{ backgroundColor: "#39304d" }}
      >
        <a
          className="navbar-brand glacialReg"
          href="/"
          style={{ fontSize: "20px" }}
        >
          GoGoo!
        </a>
      </nav>
    );
  }
} */

import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios'

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

export default class NavbarCliente extends Component {

	state = {
		isOpen: false
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
				<Navbar light expand="md" style={{ backgroundColor: "#39304d", marginBottom: "45px"}} fixed="top" >
					<NavbarBrand href="/" style={{ color: "white" }}>dropcar</NavbarBrand>
				</Navbar>
			</div>
		);
	}
}
