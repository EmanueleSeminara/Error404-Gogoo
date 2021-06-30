import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../ComponentsCss/Pannel.css";
import * as moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import {
	DatePicker,
	TimePicker,
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
	AvField,
	AvRadio,
	AvRadioGroup,
} from "availity-reactstrap-validation";
import Alert from '@material-ui/lab/Alert';

import CardPrenotaVeicolo from './CardPrenotaVeicolo';
import Axios from 'axios';

export default class FormRicerca extends Component {
	state = {
		list: [],
		type: "car",
		refParkingR: "Via Libertà",
		refParkingC: "Via Libertà",
		dateR: moment(new Date()).format('YYYY-MM-DD HH:mm'),
		dateC: moment(new Date()).format('YYYY-MM-DD HH:mm'),
		category: "",
		payment: false,
		errorTime: false
	};

	componentDidMount() {
		if (localStorage.getItem("utente") === null) {
			window.location.href = '/login';
		}
	}


	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	handleChangeDataArrivo = (date) => {
		const d = (moment(date).format('YYYY-MM-DD HH:mm'));
		this.setState({ dateC: d });
	};

	handleChangeDataPartenza = (date) => {
		const d = (moment(date).format('YYYY-MM-DD HH:mm'));
		this.setState({ dateR: d });
	};

	search = () => {
		Axios.post('/api/search/searchvehicles', this.state)
			.then((res) => {
				this.setState({ list: res.data });
			}).catch((err) => {
				console.log(err);
			})
	}

	onValidSubmit =  (event) => {
		event.preventDefault();
		if (moment(this.state.dateR) > moment(this.state.dateC)) {
			this.setState({ errorTime: true })
			this.setState({ list: [] });
		} else {
			this.setState({ errorTime: false })
			let payment = false;
			Axios.get('/api/guest/listpayments')
				.then((res) => {

					if (res.data.length !== 0) {
						payment = true;
					}

					if (payment) {
						console.log("sono dentro VERO")
						this.search();
						const reservation = {
							refVehicle: null,
							type: this.state.type,
							refParkingR: this.state.refParkingR,
							refParkingC: this.state.refParkingC,
							dateR: this.state.dateR,
							dateC: this.state.dateC,
							category: null,
							positionR: null,
							positionC: null,
							refDriver: null
						};
						window.localStorage.setItem("reservation", JSON.stringify(reservation));
					} else {
						//fare spuntare messaggio di errore 
					}

				}).catch((err) => {
					console.log(err);
					//window.location.href = '/errorServer';
				});
		}
	};


	render() {
		return (
			<div>

				<AvForm onValidSubmit={this.onValidSubmit} >


					<div>
						<div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingBottom: "20px" }}>
							<RadioGroup
								row
								name="TipoVeicolo"
								label=""
								defaultValue="car"
								onClick={this.handleChange("type")}
							>
								<FormControlLabel label="Auto" value="car" control={<Radio />} />
								<FormControlLabel label="Moto" value="scooter" control={<Radio />} />
								<FormControlLabel label="Bici" value="bicycle" control={<Radio />} />
								<FormControlLabel label="Monopattino" value="electric scooter" control={<Radio />} />
							</RadioGroup>
						</div>
						<div style={{ paddingBottom: "20px" }}>
							<AvField type="select" name="parcheggioPartenza" label="Ritiro" onClick={this.handleChange("refParkingR")}>
								<option>Via Libertà</option>
								<option>Via Roma</option>
								<option>Via Ernesto Basile</option>
								<option>Viale Regione</option>
								<option>Via Tersicore</option>
							</AvField>
						</div>

						<div style={{ paddingBottom: "20px" }}>
							<AvField type="select" name="parcheggioArrivo" label="Consegna" onClick={this.handleChange("refParkingC")}>
								<option>Via Libertà</option>
								<option>Via Roma</option>
								<option>Via Ernesto Basile</option>
								<option>Viale Regione</option>
								<option>Via Tersicore</option>
							</AvField>
						</div>
					</div>

					<center>
						<div className="row " style={{ paddingBottom: "20px" }}>
							<div className="col">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Label sm={12} >Ritiro</Label>
									<DateTimePicker format={"dd/MM/yyyy HH:mm"} minDate={new Date()} minTime={new Date()} inputVariant="outlined" value={this.state.dateR} selected={this.state.dateR} onChange={this.handleChangeDataPartenza} />
								</MuiPickersUtilsProvider>
							</div>
							<div className="col">
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Label sm={12} >Consegna</Label>
									<DateTimePicker format={"dd/MM/yyyy HH:mm"} minDate={this.state.dateR} inputVariant="outlined" value={this.state.dateC} selected={this.state.dateC} onChange={this.handleChangeDataArrivo} />
								</MuiPickersUtilsProvider>
							</div>
						</div>
							{this.state.errorTime &&
								<h6 color="red">Non puoi andare indietro nel tempo </h6>
							}

						<div style={{ paddingBottom: "20px" }}>
							<Button className="buttonCyano" type="submit" size="lg"  >
								CERCA
							</Button>
						</div>

					</center>




				</AvForm>
				<div class="d-flex flex-column">
					{this.state.list.map(((item) => (
						<div className="p-3 ">
							<CardPrenotaVeicolo id={item.id} type={item.type} category={item.category} />
						</div>
					)))}
				</div>
			</div>
		);
	}
}