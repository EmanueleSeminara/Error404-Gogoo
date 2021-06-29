import React, { Component } from "react";

import { Jumbotron, Button, ListGroupItem, Label } from "reactstrap";
import { Alert, AlertTitle } from '@material-ui/lab';

import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../ComponentsCss/Pannel.css";
import CardPagamento from "./CardPagamento";
import Axios from 'axios';
import NavbarCliente from "../../Components/NavbarCliente";


export default class PannelloPagamento extends Component {
	state = {
		listpayments: [],
		cardID: "",
		selezionePagamento: true,
		success: false,
		price: localStorage.getItem("price")
	}

	componentDidMount() {
		if (localStorage.getItem("utente") === null) {
			window.location.href = '/'
		} else {
			let c = JSON.parse(localStorage.getItem("utente"));
			if (c.role === "driver") {
				window.location.href = "/pannelloAutista";
			} else if (c.role === "valet") {
				window.location.href = "/pannelloParcheggiatore";
			} else if (c.role === "admin") {
				window.location.href = "/pannelloAmministratore";
			} else {
				if (localStorage.getItem("price") !== null) {
					Axios.get('/api/guest/listpayments')
						.then((res) => {
							this.setState({ listpayments: res.data });
							console.log(this.state.listpayments);
						}).catch((err) => {
							window.location.href = '/errorServer';
						});
				} else {
					window.location.href = '/ricerca';
				}

			}
		}
	}

	seleziona = (ID) => {
		this.setState({ cardID: ID });

	};

	onValidSubmit = (event) => {
		if (this.state.cardID === "") {
			this.setState({ selezionePagamento: false });
		}
		else {
			//generazione pdf
			window.localStorage.removeItem("price")
			this.setState({ success: true });
			this.setState({ selezionePagamento: true });

		}
	};


	render() {
		return (
			<div className="ez sfondo-card">
				<NavbarCliente />
				<div className="row justify-content-md-center  ">
					<div className="d-flex flex-column pannell-User ">

						<AvForm onValidSubmit={this.onValidSubmit}>

							{!this.state.selezionePagamento && <Alert severity="error" style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>Scegliere almeno un metodo di pagamento</Alert>}
							<center>
								<div class="col-12" style={{ marginTop: "30px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
									<Label size="lg" style={{ fontSize: "1.85rem", color: "aliceblue" }}>Seleziona metodo di pagamento</Label>
								</div>
								<div class="col-12" style={{ paddingBottom: "20px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>

									{this.state.listpayments.map(((item) => (

										<CardPagamento name={item.name} surname={item.surname} number={item.number} id={item.id} seleziona={this.seleziona} />

									)))}
									<h6>Prezzo da pagare: {this.state.price}€ </h6>
								</div>
								<Button className="buttonCyano" type="submit" style={{ marginTop: "30px", marginBottom: "30px" }}>  Paga  </Button>
							</center>

							{this.state.success &&
								<Alert severity="success" style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>Pagamento confermato</Alert>
								//aggiungere tasto per tornare alla home
							}


						</AvForm>

					</div>
				</div >
			</div>
		);
	}
}