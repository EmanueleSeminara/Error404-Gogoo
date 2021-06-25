import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../../ComponentsCss/Pannel.css";

import {
	DateTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';


import {
	ListGroup,
	ListGroupItem,
	Button,
	Input,
	Jumbotron,
	FormGroup,
	Label,
	Col,
	Form,
	ButtonGroup,
} from "reactstrap";

import {
	AvForm,
	AvGroup,
	AvRadio,
	AvRadioGroup,
	AvField,
} from "availity-reactstrap-validation";
import Axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';


export default class PannelloAggiugiVeicolo extends Component {
	state = {
		category: null,
		refParking: "Via Libertà",
		type: "car",
		error: false,
		success: false,
	};

	setRSelected = (num) => {
		this.setState({ type: num });
	}

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	add = () => {
		Axios.post('/api/vehicle/add', this.state)
			.then((res) => {
				this.setState({ error: false });
				this.setState({ success: true });
				this.setState({ category: null });
			}).catch((err) => {
				this.setState({ success: false });
				if (err.response.status === 422) {
					this.setState({ string: "errore nell'inserimento dei dati" });
					this.setState({ error: true });
				} else if (err.response.status === 503) {
					this.setState({ string: "impossibile aggiungere il veicolo al momento, riprova più tardi" });
					this.setState({ error: true });
				} else {
					window.location.href = "/serverError"
				}
			})
	}


	onValidSubmit = (event) => {
		console.log(JSON.parse(localStorage.getItem("utente")));
		event.preventDefault();
		this.add();
		console.log(this.state);
	};


	render() {
		return (
			<div className="row h-100 justify-content-md-center"
				style={{ margin: "1%", minHeight: "100vh" }}>
				<div className="col-sm-12 col-md-8 col-lg-6 my-auto">
					<AvForm onValidSubmit={this.onValidSubmit}>
						<ListGroup>
							{/*ptipologia veicolo*/}
							<center>
								<ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

									<ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
										<Button 
											color="primary" 
											onClick={() => {
												this.setRSelected("car"); 
												this.setState({ error: false });
												this.setState({ success: false });
											}}
											active={this.state.type === "car"} 
											 >
												Automobile
										</Button>
										<Button 
											color="primary" 
											onClick={() => {
												this.setRSelected("scooter");
											 	this.setState({error: false });
												this.setState({success: false });
											}}
											active={this.state.type === "scooter"}  >
												Motore
										</Button>
										<Button
											color="primary"
											onClick={() => {
												this.setRSelected("electric scooter");
												this.setState({ error: false });
												this.setState({ success: false });
											}}
											active={this.state.type === "electric scooter"}  >
												Monopattino
										</Button>
										<Button
											color="primary"
											onClick={() => {
												this.setRSelected("bicycle");
												this.setState({ error: false });
												this.setState({ success: false });
											}}
											active={this.state.type === "bicycle"}  >
												Bicicletta
										</Button>
									</ButtonGroup>
								</ListGroupItem>
							</center>

							{/* Tipologia di auto */}
							{this.state.type === "car" &&
								<ListGroupItem >
									<AvGroup >
										<center style={{ marginTop: "10px" }}>
											<AvRadioGroup
												inline
												name="Tipo1"
												label=""
												onClick={this.handleChange("category")}
												validate={{
													required: {
														errorMessage: "Il campo è richiesto",
													},
												}}
											>
												<AvRadio label="suv" value="suv" />
												<AvRadio label="utilitaria" value="utilitaire" />
												<AvRadio label="berlina" value="sedan" />
											</AvRadioGroup>
										</center>
									</AvGroup>
								</ListGroupItem >
							}

							{/* Ubicazione*/}
							<ListGroupItem>
								<center>
									<Col >
										<Label >Ubicazione</Label>
										<Input type="select" name="select" id="Ubicazione" onClick={this.handleChange("refParking")} >
											<option>Via Libertà</option>
											<option>Via Roma</option>
											<option>Via Ernesto Basile</option>
											<option>Viale Regione</option>
											<option>Via Tersicore</option>
										</Input>
									</Col>
								</center>
							</ListGroupItem>

							{/* Pulsante aggiungi*/}
							<ListGroupItem style={{ padding: "20px" }}>
								<center>
									<Button color="outline-success" type="submit" style={{ padding: "8px" }}  >
										aggiungi
									</Button>
								</center>
							</ListGroupItem>
							<br />
							{this.state.error && <Alert severity="error">{this.state.string}</Alert>}
							{this.state.success && <Alert severity="success">Veicolo aggiunto correttamente</Alert>}
						</ListGroup>
					</AvForm>
				</div>

			</div>
		);
	}
}
