import React, { Component } from "react";

import { Jumbotron, Button, ListGroupItem, Label } from "reactstrap";
import { Alert, AlertTitle } from '@material-ui/lab';

import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../ComponentsCss/Pannel.css";
import CardPagamento from "./CardPagamento";
import Axios from 'axios';


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
			this.setState({ success: true });
		}
	};


	render() {
		return (
			<div className="row h-100 justify-content-md-center" style={{ margin: "1%", minHeight: "45vh" }}>
				<div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
					<div style={{ backgroundColor: "#27394c", padding: "1vh", paddingTop: "1vh", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
						<center>
							<p
								className="glacialReg"
								style={{ fontSize: "30px", color: "white" }}
							>
								Pagamento
							</p>

							<h6 style={{ color: "white" }}>importo da pagare: {this.state.price}€</h6>

						</center>
					</div>
					<AvForm onValidSubmit={this.onValidSubmit}>
						<ListGroupItem>
							{!this.state.selezionePagamento && <Alert severity="error" style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>Scegliere almeno un metodo di pagamento</Alert>}
							<center>
								<div class="col-8" style={{ marginTop: "30px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", backgroundColor: "#255e6d" }}>
									<Label size="lg" style={{ fontSize: "1.85rem", color: "aliceblue" }}>Seleziona metodo di pagamento</Label>
								</div>
								<div class="col-8" style={{ backgroundColor: "#255e6d", paddingBottom: "20px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px" }}>

									{this.state.listpayments.map(((item) => (

										<CardPagamento name={item.name} surname={item.surname} number={item.number} id={item.id} seleziona={this.seleziona} />

									)))}

								</div>
								<Button color="primary" size="lg" style={{ marginTop: "30px", marginBottom: "30px" }}>  Paga  </Button>
							</center>

									{this.state.success && 
									<Alert severity="success" style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>Pagamento confermato</Alert>
									//aggiungere tasto per tornare alla home
									}

						</ListGroupItem>
					</AvForm>

				</div>
			</div >
		);
	}
}