import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../../ComponentsCss/Pannel.css";
import "../../../ComponentsCss/PannelloGestioneAdmin.css"
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
	Row
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

	componentDidMount() {
		if (localStorage.getItem("utente") === null) {
			window.location.href = '/'
		} else {
			let c = JSON.parse(localStorage.getItem("utente"));
			if (c.role === "driver") {
				window.location.href = "/pannelloAutista";
			} else if (c.role === "guest") {
				window.location.href = "/ricerca";
			} else if (c.role === "valet") {
				window.location.href = "/pannelloParcheggiatore";
			}
		}
	}

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
			<div className="ez sfondo" style={{ height: "100%" }}>
				<AvForm onValidSubmit={this.onValidSubmit}>
					<div className="row h-100 justify-content-md-center boxpannel">
						<div className="d-flex flex-column pannell-amministratore ">
							<div className="title">Aggiungi veicolo</div>
							{/*tipologia veicolo*/}
							<ButtonGroup style={{ flexWrap: "wrap" }}>
								<Button
									className="buttonCyanoGruoup "
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
									className="buttonCyanoGruoup"
									onClick={() => {
										this.setRSelected("scooter");
										this.setState({ error: false });
										this.setState({ success: false });
									}}
									active={this.state.type === "scooter"}  >
									Motore
								</Button>
								<Button
									className="buttonCyanoGruoup"
									onClick={() => {
										this.setRSelected("electric scooter");
										this.setState({ error: false });
										this.setState({ success: false });
									}}
									active={this.state.type === "electric scooter"}  >
									Monopattino
								</Button>
								<Button
									className="buttonCyanoGruoup"
									onClick={() => {
										this.setRSelected("bicycle");
										this.setState({ error: false });
										this.setState({ success: false });
									}}
									active={this.state.type === "bicycle"}  >
									Bicicletta
								</Button>
							</ButtonGroup>
							{/* Tipologia di auto */}
							{this.state.type === "car" &&
								<center style={{ marginTop: "30px" }}>
									<RadioGroup
										row
										name="Tipo1"
										label=""
										onClick={this.handleChange("category")}
										validate={{
											required: {
												errorMessage: "Il campo è richiesto",
											},
										}}
										style={{ backgroundColor: "transparent" }}
									>
										<FormControlLabel label="suv" value="suv" control={<Radio />} />
										<FormControlLabel label="utilitaria" value="utilitaire" control={<Radio />} />
										<FormControlLabel label="berlina" value="sedan" control={<Radio />} />
									</RadioGroup>
								</center>
							}
							{/* Ubicazione*/}
							<Label style={{ marginTop: "30px" }}>Ubicazione</Label>
							<Input type="select" name="select" id="Ubicazione" onClick={this.handleChange("refParking")} >
								<option>Via Libertà</option>
								<option>Via Roma</option>
								<option>Via Ernesto Basile</option>
								<option>Viale Regione</option>
								<option>Via Tersicore</option>
							</Input>
							{/* Pulsante aggiungi*/}
							<Button className="buttonCyano" type="submit"  >
								aggiungi
							</Button>
							{this.state.error && <Alert severity="error">{this.state.string}</Alert>}
							{this.state.success && <Alert severity="success">Veicolo aggiunto correttamente</Alert>}
						</div>
					</div>
				</AvForm>
			</div >
		);
	}
}
