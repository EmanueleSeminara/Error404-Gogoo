import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../../ComponentsCss/Pannel.css";
import Axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab';

//const data = { name: "giovanni", surname: "parisi", email: "sdx@libero.it", birthdate: "1994-05-05", phone: "3205318477"}
export default class Registrazione extends Component {


	state = {
		name: "",
		surname: "",
		email: "",
		birthdate: "",
		phone: "",
		error: false,
		success: false,
		string: ""
	};

	componentDidMount(){
			Axios.get('/api/account/mydata')
			.then((res) => {
				console.log(res);
				this.setState({ name: res.data.name });
				this.setState({ surname: res.data.surname });
				this.setState({ email: res.data.email });
				this.setState({ birthdate: res.data.birthdate });
				this.setState({ phone: res.data.phone });
			}).catch((err) =>{
				window.location.href = "/serverError"
			});
	}

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	stampa = () => {
		console.log(this.state);
	}

	onValidSubmit = (event) => {
		console.log(JSON.parse(localStorage.getItem("utente")));
		event.preventDefault();
		this.update();
	};

	update = () => {
		Axios.put("/api/user/update", this.state)
		.then((res) => {
			this.setState({ error: false });
			this.setState({ success: true });
		}).catch((err) =>{
			this.setState({ success: false });
			if (err.response.status === 513) {
				this.setState({ string: "email già associata ad un account" });
				this.setState({ error: true });
			} else if (err.response.status === 422) {
				this.setState({ string: "errore nell'inserimento dei dati" });
				this.setState({ error: true });
			} else if (err.response.status === 503) {
				console.log("inpossibile regitrarsi al momento")
				this.setState({ string: "impossibile regitrarsi al momento, riprova più tardi" });
				this.setState({ error: true });
			} else {
				window.location.href = "/serverError"
			}
		});
	}



	render() {
		// definisco il lower bound per la data di nascita
		let eighteenYearsAgo = new Date();
		eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 16);
		eighteenYearsAgo = eighteenYearsAgo.toJSON().split("T")[0];

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
											Modifica Dati
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
											placeholder={this.state.name}
											onChange={this.handleChange("name")}
											style={{ label: { color: "white" } }}
										/>
									</div>

									<div className="col-12 col-md-6">
										<AvField
											name="cognome"
											type="text"
											label="Cognome"
											placeholder={this.state.surname}
											onChange={this.handleChange("surname")}
										/>
									</div>
								</div>

								<br />
								<hr style={{ backgroundColor: "#3FD0CB" }} />

								{/* Riga data di nascita */}
								<div className="row">
									<div className="col-12">
										<AvField
											name="dataNascita"
											label="Data di nascita"
											type="date"
											placeholder={this.state.birthdate}
											max={eighteenYearsAgo}
											onChange={this.handleChange("birthdate")}
											errorMessage="Devi essere maggiorenne"
										/>
									</div>
								</div>

								<br />
								<hr style={{ backgroundColor: "#3FD0CB" }} />

								{/*Riga email */}
								<div className="row">
									<div className="col-12">
										<AvField
											name="email"
											label="Email"
											type="email"
											placeholder={this.state.email}
											onChange={this.handleChange("email")}
											errorMessage="Campo non valido."
											/* required */
										/>
									</div>
								</div>

								<br />
								<hr style={{ backgroundColor: "#3FD0CB" }} />


								{/* Riga numero di telefono */}
								<div className="row">
									<div className="col-12 ">
										<AvField
											name="telefono"
											label="Numero di telefono"
											type="tel"
											placeholder={this.state.phone}
											validate={{
												minLength: { value: 10 },
												maxLength: { value: 10 },
											}}
											errorMessage="il numero di telefono deve contenere 10 cifre"
											onChange={this.handleChange("phone")}
										/>
									</div>
								</div>

								<hr style={{ backgroundColor: "#3FD0CB" }} />

								<div className="text-center" style={{ paddingTop: "2%" }}>
									<Button color="primary" type="submit" size="lg" >
										Modifica
									</Button>
								</div>

								<br />
								{this.state.error && <Alert severity="error">{this.state.string}</Alert>}
								{this.state.success && <Alert severity="success">Dati modificati correttamente</Alert>}
							</Jumbotron>
						</div>
					</div>
				</AvForm>
			</div>
		);
	}
}
