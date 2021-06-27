import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../../ComponentsCss/Pannel.css";
import NavbarCliente from "../../NavbarCliente";
import NavbarDipendente from "../../NavbarDipendente";
import Alert from '@material-ui/lab/Alert';
import Axios from 'axios'
import "../../../ComponentsCss/ModificaPassword.css"


export default class Registrazione extends Component {

	state = {
		password: "",
		password1: "",
		error: false,
		success: false,
		string: "",
		role: ""
	};

/* 	componentDidMount() {
		if (localStorage.getItem("utente") !== null) {
			let c = JSON.parse(localStorage.getItem("utente"));
			this.setState({ role: c.role })
			if (c.role === "guest") {
				window.location.href = "/ricerca";
			} else if (c.role === "admin") {
				window.location.href = "/pannelloAmministratore";
			} else if (c.role === "valet"){
				window.location.href = "/pannelloParcheggiatore";
			} else {
				window.location.href = "/pannelloAutista";
			}
		} else {
			window.location.href = "/";
		}
	}  */

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	isStrongPassword(value, ctx, input, cb) {
		//console.log(!value);

		if (!value || value === '') {
			cb(false);
			return;
		}

		if (value.match(/[$&+,:;=?@#|'<>.^*()%!-]+/) && value.match(/[a-z]+/) && value.match(/[A-Z]+/) && value.match(/[0-9]+/)) {
			cb(true);
			return;
		} else {
			cb(false);
			return;

		}
	}

	modificaPassword = () => {
		console.log("funzione modifica");
		Axios.put('/api/user/changepassword', this.state)
			.then((res) => {
				console.log(res);
				this.setState({ error: false });
				this.setState({ success: true });
			}).catch((err) => {
				this.setState({ success: false });
				if (err.response.status === 422) {
					this.setState({ string: "errore nell'inserimento dei dati" });
					this.setState({ error: true });
				} else if (err.response.status === 503) {
					this.setState({ string: "impossibile cambiare password al momento, riprova più tardi" });
					this.setState({ error: true });
				} else {
					window.location.href = "/serverError"
				}
			});
	}

	onValidSubmit = (event) => {
		console.log("tasto Premuto");
		event.preventDefault();
		if (this.state.password === this.state.password1) {
			this.modificaPassword();
		} else {
			this.setState({ string: "le password inserite non sono uguali, RIPROVA" });
			this.setState({ error: true });
		}
	};



	render() {
		return (
			<div className="ez sfondo" style={{ height: "100%" }}>
				{this.state.role === "guest" &&
					<NavbarCliente />
				}
				{this.state.role !== "guest" &&
					<NavbarDipendente />
				}
				{this.state.error && <Alert severity="error">{this.state.string}</Alert>}
				{this.state.success && <Alert severity="success">Password Modificata Correttamente</Alert>}

				<AvForm

					onValidSubmit={this.onValidSubmit}
				>
					<div
						className="row h-100 justify-content-md-center  boxpannel "
						
					>

						<div className="row pannell">
							<div className="col-9">

								<div className="title" style={{ marginBottom: "40px", marginTop: "20px!important" }}>
									Change Password
								</div>





								{/* Riga password */}
								<div className="row">
									<div className="col-12 ">
										<AvField
											name="password"
											label="Password"
											type="password"
											validate={{
												required: {
													value: true,
													errorMessage: "Il campo è richiesto"
												},
												minLength: { value: 8, errorMessage: "La password deve contenere almeno 8 caratteri" },
												isStrong: this.isStrongPassword
											}}
											errorMessage="La password deve contenere almeno una lettera minuscola, una lettere maiuscola, un numero e un carattere speciale"
											onChange={this.handleChange("password")}
										/>
									</div>
								</div>




								{/* Riga password */}
								<div className="row">
									<div className="col-12 ">
										<AvField
											name="password1"
											label="Re-enter Password"
											type="password"
											validate={{
												required: { value: true, errorMessage: "Il campo è richiesto" },
											}}
											onChange={this.handleChange("password1")}
										/>
									</div>
								</div>





								<div className="text-center">
									<Button className="buttonCyano" type="submit" >
										Change
									</Button>
								</div>




							</div>
						</div>

					</div>
				</AvForm>
			</div>
		);
	}
}