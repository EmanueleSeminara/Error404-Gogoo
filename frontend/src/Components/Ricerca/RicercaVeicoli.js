import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../ComponentsCss/Pannel.css";
import * as moment from 'moment';


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
	};

	componentDidMount(){
		Axios.get('/api/guest/listpayments')
			.then((res) => {
				console.log(res.data.length);
				if (res.data.length !== 0){
					console.log("sono dentro")
					this.setState({ payment: true });
				}
			}).catch((err) => {
				window.location.href = '/errorServer';
			});
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

	validPayament = new Promise((resolve, reject) => {
		Axios.get('/api/guest/listpayments')
			.then((res) => {
				console.log(res.data.length);
				if (res.data.length !== 0){
					resolve(true)
				} else {
					resolve(false);
				}
			}).catch((err) => {
				window.location.href = '/errorServer';
			});
	})

	validLicense = () => {
		Axios.get('/api/guest/getdatacarlicense')
			.then((res) => {
				if(this.state.type === "car"){
					console.log("hai la patente per la macchina");
					this.setState({ license: res.data.b})
				} else if(this.state.type === "scooter"){
					console.log("hai la patente per il motore");
					this.setState({ license: (res.data.b || res.data.a2 || res.data.a1 || res.data.am || res.data.a) })
				}
				return true
			}).catch((err) => {
				window.location.href = "/serverError"
			});
	}

	onValidSubmit = async (event) => {
		console.log("sono dentro onValid");
		const g = await this.validPayament();
		if (g){
			console.log("sono dentro VERO")

			this.search();
			const reservation = {
				refVehicle: "",
				type: this.state.type,
				refParkingR: this.state.refParkingR,
				refParkingC: this.state.refParkingC,
				dateR: this.state.dateR,
				dateC: this.state.dateC,
				category: "",
				positionR: "",
				positionC: "",
			};
			window.localStorage.setItem("reservation", JSON.stringify(reservation));
		} else {
			return (
			<Alert severity="error">Non possiedi una patente valida per noleggiare il veicolo</Alert>
			)
		}
	};

	render() {
		return (
			<div>

				<AvForm onValidSubmit={this.onValidSubmit} >
					<ListGroup>
						<ListGroupItem >
							<div>
								<div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingBottom: "20px" }}>
									<AvRadioGroup
										inline
										name="TipoVeicolo"
										label=""
										value="car"
										onClick={this.handleChange("type")}
									>
										<AvRadio label="Auto" value="car" />
										<AvRadio label="Moto" value="scooter" />
										<AvRadio label="Bici" value="bicycle" />
										<AvRadio label="Monopattino" value="electric scooter" />
									</AvRadioGroup>
								</div>
								<div style={{ paddingBottom: "20px" }}>
									<AvField type="select" name="select" label="Ritiro" onClick={this.handleChange("refParkingR")}>
										<option>Via Libertà</option>
										<option>Via Roma</option>
										<option>Via Ernesto Basile</option>
										<option>Viale Regione</option>
										<option>Via Tersicore</option>
									</AvField>
								</div>

								<div style={{ paddingBottom: "30px" }}>
									<AvField type="select" name="select" label="Consegna" onClick={this.handleChange("refParkingC")}>
										<option>Via Libertà</option>
										<option>Via Roma</option>
										<option>Via Ernesto Basile</option>
										<option>Viale Regione</option>
										<option>Via Tersicore</option>
									</AvField>
								</div>
							</div>

							<center>
								<div className="row " style={{ paddingBottom: "30px" }}>
									<div className="col">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<DateTimePicker format={"dd/MM/yyyy hh:mm"} minDateTime={new Date()} label="Ritiro" inputVariant="outlined" value={this.state.dateR} selected={this.state.dateR} onChange={this.handleChangeDataPartenza} />
										</MuiPickersUtilsProvider>
									</div>
									<div className="col">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<DateTimePicker format={"dd/MM/yyyy hh:mm"} minDateTime={this.state.dateR} label="Consegna" inputVariant="outlined" value={this.state.dateC} selected={this.state.dateC} onChange={this.handleChangeDataArrivo} />
										</MuiPickersUtilsProvider>
									</div>
								</div>

								<div style={{ paddingBottom: "30px" }}>
									<Button color="primary" type="submit" size="lg"  >
										CERCA
									</Button>
								</div>

							</center>
						</ListGroupItem>


					</ListGroup>
				</AvForm>
				{this.state.list.map(((item) => (
					<CardPrenotaVeicolo id={item.id} type={item.type} category={item.category} />
				)))}
			</div>
		);
	}
}