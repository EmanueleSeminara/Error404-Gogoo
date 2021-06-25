import React, { Component } from "react";

import { Jumbotron, Button, Form, FormGroup, Label, Input, } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../../ComponentsCss/Pannel.css";
import Axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';

export default class Registrazione extends Component {

	state = {
		name: "",
		surname: "",
		date: "",
		number: "",
		cvv: "",
		error: false,
		success: false,
		string: ""
	};

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	stampa = () => {
		console.log(this.state);
	}

	addpaymentmethod = () => {
		Axios.post('/api/guest/addpaymentmethod', this.state)
			.then((res) => {
				this.setState({ error: false });
				this.setState({ success: true });
			}).catch((err) => {
				if (err.response.status === 513) {
					this.setState({ string: "hai già inserito una patente" });
					this.setState({ error: true });
				} else if (err.response.status === 422) {
					this.setState({ string: "errore nell'inserimento dei dati" });
					this.setState({ error: true });
				} else if (err.response.status === 503) {
					this.setState({ string: "impossibile inserie la patente al momento, riprova più tardi" });
					this.setState({ error: true });
				} else {
					window.location.href = "/serverError"
				}
			});
	}

	onValidSubmit = (event) => {
		event.preventDefault();
		this.addpaymentmethod();
		console.log(this.state);
	};



	render() {
		// definisco il lower bound per la data di nascita
		let today = new Date();
		today.setFullYear(today.getFullYear());
		today = today.toJSON().split("T")[0];

		return (
			<div className="ez">

				<AvForm
					style={{ minHeight: "90vh" }}
					onValidSubmit={this.onValidSubmit}
				>
					<div
						className="row h-100 justify-content-md-center"
						style={{ margin: "5%" }}
					>
						<div className="col-sm-12 col-md-8 col-lg-6 my-auto">
							<Jumbotron style={{ backgroundColor: "#27394c", color: "beige" }} >
								<center>
									<a href="/" style={{ textDecoration: "none" }}>
										<p
											className="glacialReg"
											style={{ fontSize: "40px", color: "white" }}
										>
											Inserisci Carta
										</p>
									</a>
								</center>

								<br />
								<hr style={{ backgroundColor: "white" }} />
								{/* Riga nome e cognome */}
								<div className="row">
									<div className="col-12 col-md-6">
										<AvField
											name="nome"
											type="text"
											label="Nome"
											onChange={this.handleChange("name")}
											style={{ label: { color: "white" } }}

											validate={{
												required: {
													value: true,
													errorMessage: "Il campo è richiesto",
												},
											}}
										/>
									</div>

									<div className="col-12 col-md-6">
										<AvField
											name="cognome"
											type="text"
											label="Cognome"
											onChange={this.handleChange("surname")}
											required
											validate={{
												required: {
													value: true,
													errorMessage: "Il campo è richiesto.",
												},
											}}
										/>
									</div>
								</div>

								<br />
								<hr style={{ backgroundColor: "#3FD0CB" }} />

								{/* Riga numero carta */}
								<center>
									<div className="row">
										<div className="col-12">
											<AvField
												name="number"
												type="text"
												label="Numero Carta"
												onChange={this.handleChange("number")}
												style={{ label: { color: "white" } }}

												validate={{
													required: { value: true, errorMessage: "Il campo è richiesto",},
													minLength: { value: 16 },
													maxLength: { value: 16 },
												}}
												errorMessage="il numero di carta deve contenere da 13 a 16 cifre"
											/>
										</div>
									</div>

								</center>



								<hr style={{ backgroundColor: "#3FD0CB" }} />

								{/* Riga cvv e scadenza */}
								<div className="row">
									<div className="col-12 col-md-6">
										<AvField
											name="cvv"
											type="int"
											label="cvv"
											onChange={this.handleChange("cvv")}
											style={{ label: { color: "white" } }}

											validate={{
												required: {value: true, errorMessage: "Il campo è richiesto"},
												minLength: { value: 3 },
												maxLength: { value: 3 },
											}}
											errorMessage="il cvv deve contenere 3 cifre"
										/>
									</div>

									<div className="col-12 col-md-6">
										<AvField
											name="dataScadenza"
											label="Data di Scadenza"
											type="date"
											min={today}
											onChange={this.handleChange("date")}
											validate={{
												required: {
													value: true,
													errorMessage: "Il campo è richiesto.",
												},
											}}
										/>
									</div>
								</div>

								<br />
								<hr style={{ backgroundColor: "#3FD0CB" }} />
								

								<div className="text-center" style={{ paddingTop: "2%" }}>
									<Button color="primary" type="submit" size="lg" >
										Inserisci
									</Button>
								</div>

								<br />
								{this.state.error && <Alert severity="error">{this.state.string}</Alert>}
								{this.state.success && <Alert severity="success">Metodo di pagamento inserito correttamente</Alert>}
							</Jumbotron>
						</div>
					</div>
				</AvForm>

			</div>
		);
	}
}