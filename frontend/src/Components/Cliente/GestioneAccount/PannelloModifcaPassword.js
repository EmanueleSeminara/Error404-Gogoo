import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../../ComponentsCss/Pannel.css";
import Alert from '@material-ui/lab/Alert';
import Axios from 'axios'


export default class Registrazione extends Component {

	state = {
		password: "",
		password1: "",
		error: false,
		success: false,
		string: ""
	};

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
		}).catch((err) =>{
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
		if (this.state.password === this.state.password1){
			this.modificaPassword();
		} else {
			this.setState({ string: "le password inserite non sono uguali, RIPROVA" });
			this.setState({error: true});
		}
	};



	render() {
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
										Modifica Password
										</p>
									</a>
								</center>
								<br />
								<hr style={{ backgroundColor: "#3FD0CB" }} />

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

								<br />
								<hr style={{ backgroundColor: "#3FD0CB" }} />

								{/* Riga password */}
								<div className="row">
									<div className="col-12 ">
										<AvField
											name="password1"
											label="Reinserisci Password"
											type="password"
											validate={{
												required: { value: true, errorMessage: "Il campo è richiesto"},
											}}
											onChange={this.handleChange("password1")}
										/>
									</div>
								</div>

								<br />
								<hr style={{ backgroundColor: "#3FD0CB" }} />


								<div className="text-center" style={{ paddingTop: "2%" }}>
									<Button color="primary" type="submit" size="lg" >
										Modifica
									</Button>
								</div>

								
								<br />
								{this.state.error && <Alert severity="error">{this.state.string}</Alert>}
								{this.state.success && <Alert severity="success">Password Modificata Correttamente</Alert>}

							</Jumbotron>
						</div>
					</div>
				</AvForm>
			</div>
		);
	}
}