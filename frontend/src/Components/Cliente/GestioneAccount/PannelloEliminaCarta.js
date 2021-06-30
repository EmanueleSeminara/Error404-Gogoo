import React, { Component } from "react";

import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../../ComponentsCss/Pannel.css";
import faker from 'faker';
import CardEliminaCarta from "./CardEliminaCarta";
import Axios from 'axios';
import NavbarCliente from "../../NavbarCliente";
import { Alert, AlertTitle } from '@material-ui/lab';
import "../../../ComponentsCss/PannelloEliminaCarta.css"




export default class Registrazione extends Component {
	state = {
		listpayments: []
	}

	
	componentDidMount() {
		if (localStorage.getItem("utente") === null) {
			window.location.href = '/'
		} else {
			let c = JSON.parse(localStorage.getItem("utente"));
			if (c.role === "driver") {
				window.location.href = "/pannelloAutista";
			} else if (c.role === "admin") {
				window.location.href = "/pannelloAmministratore";
			} else if (c.role === "valet") {
				window.location.href = "/pannelloParcheggiatore";
			} else {
			Axios.get('/api/guest/listpayments')
			.then((res) => {
				this.setState({ listpayments: res.data });
				console.log(this.state.listpayments);
			}).catch((err) => {
				window.location.href = '/errorServer';
			});
		}
	}
}
	
	remove = (cardID) => {
		Axios.delete('/api/guest/deletepayment/' + cardID)
		.then((res) => {
			this.setState({ listpayments: this.state.listpayments.filter(card => card.id !== cardID) });
		}).catch((err) => {
			window.location.href = '/errorServer';
		});
	};

	render() {
		return (
			
			<div className="ez sfondo-card">
				<NavbarCliente />
				<div className="row justify-content-md-center boxpannel ">
					<div className="col-10 bg-pannell">
						<div >
						<center><div className="title">Rimuovi Carta</div></center>
				

							
							{this.state.listpayments.length == 0 && <Alert severity="error">Non hai nessun metodo di pagamento</Alert>}

							{<div>
								{ this.state.listpayments.map(((item) => (
									<div className="col">

									<CardEliminaCarta name={item.name} surname={item.surname} number={item.number} id={item.id} remove={this.remove}/>
									</div>

								)))}
							</div>}

						</div>
					</div>
				</div>
			</div >
			
		);
	}
}