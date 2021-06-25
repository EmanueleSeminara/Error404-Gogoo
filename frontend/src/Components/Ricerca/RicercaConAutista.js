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
import CardPrenotaVeicolo from './CardPrenotaVeicolo';
import Axios from 'axios';


export default class FormRicerca extends Component {
	state = {
		list: [],
		rSelected: "1",
		type: "car",
		dateR: moment(new Date()).format('YYYY-MM-DD HH:mm'),
		dateC: moment(new Date()).format('YYYY-MM-DD HH:mm'),
		category: "suv",
		positionR: "",
		positionC: "",

	};


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
		Axios.post('/api/search/searchvehicles')
			.then((res) => {
				this.setState({ list: res.data });
			}).catch((err) => {
				console.log(err);
			})
	}


	onValidSubmit = (event) => {
		event.preventDefault();
		this.search();
		const reservation = {
			id: "",
			type: this.state.type,
			refParkingR: "",
			refParkingC: "",
			dateR: this.state.dateR,
			dateC: this.state.dateC,
			category: this.state.category,
			positionR: this.state.positionR,
			positionC: this.state.positionC,
		};
		window.localStorage.setItem("reservation", JSON.stringify(reservation));
		console.log(JSON.parse(localStorage.getItem("reservation")));
	};

	render() {
		return (
			<div>
				<AvForm onValidSubmit={this.onValidSubmit} >
					<ListGroup>
						<ListGroupItem >
							<div>
								<div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", marginBottom: "0", paddingBottom: "20px" }}>
									<AvRadioGroup
										inline
										name="TipoAuto"
										label=""
										value="suv"
										onClick={this.handleChange("category")}
									>
										<AvRadio label="suv" value="suv" />
										<AvRadio label="utilitaria" value="utilitaire" />
										<AvRadio label="berlina" value="sedan" />
									</AvRadioGroup>
								</div>
								<div style={{ paddingBottom: "20px" }}>
									<AvField
										name="ViaRiferimento"
										type="text"
										label="Dove ti trovi?"
										placeholder="inserisci la via in cui ti trovi"
										onChange={this.handleChange("positionR")}
										errorMessage="Non sembra tu abbia inserito una via"
										validate={{
											required: {
												value: true,
												errorMessage: "Il campo è richiesto",
											},
										}}
										required
									/>
								</div>
								<div style={{ paddingBottom: "30px" }}>
									<AvField
										name="LuogoArrivo"
										type="text"
										label="Destinazione"
										placeholder="inserisci la via di destinazione"
										onChange={this.handleChange("positionC")}
										errorMessage="Non sembra tu abbia inserito una via"
										validate={{
											required: {
												value: true,
												errorMessage: "Il campo è richiesto",
											},
										}}
										required
									/>
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

				{<div>

					{this.state.list.map(((item) => (
						<CardPrenotaVeicolo id={item.id} type={item.type} category={item.category} positionR={item.positionR} state={item.state} />
					)))}
				</div>}
			</div>
		);
	}
}