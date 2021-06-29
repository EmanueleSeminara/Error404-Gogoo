import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../ComponentsCss/Pannel.css";
import * as moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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
		Axios.post('/api/search/searchcarwithdriver', this.state)
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
			id: null,
			type: this.state.type,
			refParkingR: null,
			refParkingC: null,
			dateR: this.state.dateR,
			dateC: this.state.dateC,
			category: this.state.category,
			positionR: this.state.positionR,
			positionC: this.state.positionC,
			refDriver: null
		};
		window.localStorage.setItem("reservation", JSON.stringify(reservation));
	};

	render() {
		return (
			<div>
				<AvForm onValidSubmit={this.onValidSubmit} >
					
						
							<div>
								<div style={{ display: "flex", justifyContent: "center", paddingTop: "20px", marginBottom: "0", paddingBottom: "20px" }}>
									<RadioGroup
										row
										inline
										name="TipoAuto"
										label=""
										defaultValue="suv"
										onClick={this.handleChange("category")}
									>
										<FormControlLabel label="suv" value="suv" control={<Radio />}/>
										<FormControlLabel label="utilitaria" value="utilitaire" control={<Radio />}/>
										<FormControlLabel label="berlina" value="sedan" control={<Radio />}/>
									</RadioGroup>
								</div>
								<div style={{ paddingBottom: "20px" }}>
									<AvField
										name="Partenza"
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
								<div style={{ paddingBottom: "20px" }}>
									<AvField
										name="Arrivo"
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
								<div className="row " style={{ paddingBottom: "20px" }}>
									<div className="col">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<Label sm={12} >Ritiro</Label>
											<DateTimePicker format={"dd/MM/yyyy hh:mm"} minDateTime={new Date()}  inputVariant="outlined" value={this.state.dateR} selected={this.state.dateR} onChange={this.handleChangeDataPartenza} />
										</MuiPickersUtilsProvider>
									</div>
									<div className="col">
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<Label sm={12} >Consegna</Label>
											<DateTimePicker format={"dd/MM/yyyy hh:mm"} minDateTime={this.state.dateR} inputVariant="outlined" value={this.state.dateC} selected={this.state.dateC} onChange={this.handleChangeDataArrivo} />
										</MuiPickersUtilsProvider>
									</div>
								</div>

								<div style={{ paddingBottom: "20px" }}>
									<Button className="buttonCyano" type="submit" size="lg"  >
										CERCA
									</Button>
								</div>

							</center>
					
				</AvForm>

			

					{this.state.list.map(((item) => (
						<CardPrenotaVeicolo id={item.id} type={item.type} category={item.category} />
					)))}
			
			</div>
		);
	}
}