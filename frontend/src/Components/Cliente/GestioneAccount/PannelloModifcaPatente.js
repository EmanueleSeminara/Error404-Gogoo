import React, { Component } from "react";
import { Button, Form, FormGroup, Label } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../../ComponentsCss/Pannel.css";
import { Alert} from '@material-ui/lab';
import Axios from 'axios'
import NavbarCliente from "../../NavbarCliente";
import Checkbox from '@material-ui/core/Checkbox';


export default class PannelloModificaPatente extends Component {

	state = {
		number: "",
		date: "",
		a: false,
		am: false,
		a1: false,
		a2: false,
		b: false,
		error: false,
		success: false,
		string: "",
		disabled: false
	};

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
					Axios.get('/api/guest/getdatacarlicense')
						.then((res) => {
							console.log(res.data)
							if(res.data.number == null){
								console.log("sono dentro")
								this.setState({ string: "Non hai inserito ancora una patente" });
								this.setState({ error: true });
								this.setState({ disabled: true });
							} else {
								this.setState({ number: res.data.number });
								this.setState({ date: res.data.date });
								this.setState({ a: res.data.a });
								this.setState({ am: res.data.am });
								this.setState({ a1: res.data.a1 });
								this.setState({ a2: res.data.a2 });
								this.setState({ b: res.data.b });
							}
						}).catch((err) => {
							window.location.href = "/serverError"
						});
				}
			}
		}

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	change = (input) => (e) => {
		this.setState({ [input]: e.target.checked })
	}

	updatecarlicense = () => {
		Axios.put('/api/guest/updatecarlicense', this.state)
			.then((res) => {
				this.setState({ error: false });
				this.setState({ success: true });
			}).catch((err) => {
				if (err.response.status === 422) {
					this.setState({ string: "errore nell'inserimento dei dati" });
					this.setState({ error: true });
				} else if (err.response.status === 503) {
					this.setState({ string: "impossibile aggiornare la patente al momento, riprova più tardi" });
					this.setState({ error: true });
				} else {
					window.location.href = "/serverError"
				}
			});
	}

	onValidSubmit = (event) => {
		event.preventDefault();
		this.updatecarlicense();
	};



	render() {
		// definisco il lower bound per la data di nascita
		let today = new Date();
		today.setFullYear(today.getFullYear());
		today = today.toJSON().split("T")[0];

		return (
			<div className="ez sfondo" style={{ height: "100%" }}>
				<NavbarCliente />
				{this.state.error && <Alert severity="error">{this.state.string}</Alert>}
				{this.state.success && <Alert severity="success">Patente aggiornata correttamente</Alert>}

				<AvForm onValidSubmit={this.onValidSubmit}>
					<div
						className="row h-100 justify-content-md-center  boxpannel "
					>
						<div className="bg-pannell">
							<div >
								<div className="title">Aggiorna Patente</div>
								{/* Riga numero e scadenza */}
								<div className="row">
									<div className="col-12 col-md-6">
										<AvField
											name="number"
											type="text"
											label="Codice Patente"
											placeholder={this.state.number}
											onChange={this.handleChange("number")}
											style={{ label: { color: "white" } }}
										/>
									</div>

									<div className="col-12 col-md-6">
										<AvField
											name="dataScadenza"
											label="Data di Scadenza"
											type="date"
											value= {this.state.data}
											min={today}
											onChange={this.handleChange("date")}
											validate={{
												required: {
													value: true,
													errorMessage: "Il campo è richiesto.",
												}
											}}
										/>
									</div>
								</div>
								<center>
									<Form>
										<FormGroup check inline>
											<Label check>
												<Checkbox
													onChange={this.change("a")}
													checked={this.state.a}
												/> A
											</Label>
										</FormGroup>
										<FormGroup check inline>
											<Label check>
												<Checkbox
													onChange={this.change("am")}
													checked={this.state.am}
												/>
												AM
											</Label>
										</FormGroup>
										<FormGroup check inline>
											<Label check>
												<Checkbox
													onChange={this.change("a1")}
													checked={this.state.a1}
												/>
												A1
											</Label>
										</FormGroup>
										<FormGroup check inline>
											<Label check>
												<Checkbox
													onChange={this.change("a2")}
													checked={this.state.a2}
												/> A2
											</Label>
										</FormGroup>
										<FormGroup check inline>
											<Label check>
												<Checkbox
													onChange={this.change("b")}
													checked={this.state.b}

												/>
												B
											</Label>
										</FormGroup>
									</Form>
								</center>
								<div className="text-center" style={{ paddingTop: "2%" }}>
									<Button type="submit" className="buttonCyano" disabled={this.state.disabled}>
										Update
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