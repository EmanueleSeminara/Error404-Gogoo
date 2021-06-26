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
				<Navbar light expand="md" style={{ backgroundColor: "#112f40" }} >
					<NavbarBrand href="/" style={{ color: "white" }}>GoGoo!</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav style={{ color: "white" }}>
									Gestione Accout
								</DropdownToggle>
								<DropdownMenu left>
									<DropdownItem>
										<a href="/modificaPassword" style={{ textDecoration: "none" }}>Modifica password</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/modificaDatiPersonali" style={{ textDecoration: "none" }}>Modifica dati personali</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/inserimentoPatente" style={{ textDecoration: "none" }}>Inserimento patente</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/aggiornaPatente" style={{ textDecoration: "none" }}>Aggiorna patente</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/inserimentoMetodoPagamento" style={{ textDecoration: "none" }}>Inserimento metodo pagamento</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/eliminazioneMetodoPagamento" style={{ textDecoration: "none" }}>Eliminazione metodo pagamento</a>
									</DropdownItem>

								</DropdownMenu>
							</UncontrolledDropdown>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav style={{ color: "white" }}>
									Gestione Prenotazione
								</DropdownToggle>
								<DropdownMenu left>
									<DropdownItem>
										<a href="/ritiroConsegna" style={{ textDecoration: "none" }}>Ritiro/Consegna</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/prenotazioniEffettuate" style={{ textDecoration: "none" }}>Prenotazioni effettuate</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/segnalaGuasto" style={{ textDecoration: "none" }}>Segnala guasto</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/consegnaFuoriStallo" style={{ textDecoration: "none" }}>Consegna fuori dallo stallo</a>
									</DropdownItem>
									<DropdownItem>
										<a href="/ritardoConsegna" style={{ textDecoration: "none" }}>Ritardo consegna</a>
									</DropdownItem>

								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
						<Button onClick={() => {this.logout()}} style={{ color: "white", backgroundColor: "transparent", border: "none" }}>Logout</Button>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}