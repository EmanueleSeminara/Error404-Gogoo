import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@material-ui/lab/Alert';
import {Button, Label, Col, Input, Row, FormGroup} from 'reactstrap';
import {AvForm} from "availity-reactstrap-validation";
import {DateTimePicker,MuiPickersUtilsProvider,} from '@material-ui/pickers';
import "../../../ComponentsCss/visualizzaPrenotazioni.css"
import Axios from 'axios';
import * as moment from 'moment';


export default class CardPrenotazione extends Component {
	state = {
		id: "",
		type: "",
		refParkingR: "",
		refParkingC: "",
		dateR: "",
		dateC: "",
		refDriver: "",
		refVehicle: "",
		category: "",
		positionR: "",
		positionC: "",
		modifica: false,
	};

	setting = () => {
		this.setState({ id: this.props.id });
		this.setState({ type: this.props.type });
		this.setState({ refParkingR: this.props.refParkingR });
		this.setState({ refParkingC: this.props.refParkingC });
		this.setState({ dateR: this.props.dateR });
		this.setState({ dateC: this.props.dateC });
		this.setState({ refDriver: this.props.refDriver });
		this.setState({ refVehicle: this.props.refVehicle });
		this.setState({ category: this.props.category });
		this.setState({ positionR: this.props.positionR });
		this.setState({ positionC: this.props.positionC });
	};

	componentDidMount() {
		this.setting();
	}

	componentDidUpdate(propsPrecedenti) {
		if (this.props !== propsPrecedenti) {
			this.setting();
		}
	}

	setModifica = (input) => {
		this.setState({ modifica: !this.state[input] });
	}

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	}

	handleChangeDataArrivo = (date) => {
		const d = (moment(date).format('YYYY-MM-DD HH:mm'));
		this.setState({ dateC: d });
	};

	handleChangeDataPartenza = (date) => {
		const d = (moment(date).format('YYYY-MM-DD HH:mm'));
		this.setState({ dateR: d });
	};

	modify = () => {
		Axios.put('/api/admin/editreservation/', this.state)
			.then((res) => {
				console.log(res)
			}).catch((err) => {
				console.log(err)
			})
	}

	render() {
		return (
			<div>
				<div className="card card-css">
					<center>

						<div className="row no-gutters">
							<div className="col">
								<div className="card-body">

									<div className="row no-gutters">
										<div className="col-md-12">
											<p className="infoCard"><strong>ID veicolo:  {this.state.refVehicle}</strong></p>
											<hr style={{ backgroundColor: "white" }} />
										</div>


									</div>
									<div className="row no-gutters">
										<div className="col-md-6">
											<p className="infoCard"><strong>Tipo:</strong> {this.state.type} {this.state.type === "car" ? <> {this.state.category}</> : <></>}</p>
											{this.state.refParkingR != null &&
												<p className="infoCard"><strong>Parcheggio ritiro:</strong>   {this.state.refParkingR}</p>
											}
											{this.state.positionR != null &&
												<p className="infoCard"><strong>Posizione di ritiro:</strong>   {this.state.positionR}</p>
											}
											<p className="infoCard"><strong>Data ritiro:</strong>   {this.state.dateR}</p>
										</div>
										<div className="col-md-6">
											<p className="infoCard"><strong>Autista:</strong> {this.state.refDriver}</p>     
											{this.state.refParkingC != null &&
												<p className="infoCard"><strong>Parcheggio consegna:</strong>   {this.state.refParkingC}</p>
											}
											{this.state.positionC != null &&
												<p className="infoCard"><strong>Posizione di consegna:</strong>   {this.state.positionC}</p>
											}
											<p className="infoCard"><strong>Data consegna:</strong>   {this.state.dateC}</p>
										</div>
									</div>

									<center>
										<Button type="button" className="buttonModify" onClick={() => this.setModifica("modifica")} style={{ marginRight: "10px", marginTop: "20px" }}  >
											Modifica
										</Button>
										<Button type="button" className="buttonAnnulla" onClick={() => this.props.remove(this.state.id)} style={{ marginRight: "10px", marginTop: "20px" }}  >
											Elimina
										</Button>
									</center>
								</div>
							</div>
						</div>
						{this.state.modifica &&
							<center>

								<AvForm>
									{this.state.positionR == null &&
										<Row>
											<Col>
												<FormGroup>
													<Label for="exampleSelect">Tipo veicolo</Label>
													<Input type="select" name="select" id="type" onClick={this.handleChange("type")}>
														<option>Auto</option>
														<option>Moto</option>
														<option>Monopattino</option>
														<option>Bicicletta</option>
													</Input>
												</FormGroup>
											</Col>
										</Row>
									}
									<Row>
										<Col>
											<Label sm={12}>Destinazione</Label>
											<Input type="select" name="selectConsegna" id="parcheggioConsegna" onClick={this.handleChange("refParkingC")} >
												<option>Via Libertà</option>
												<option>Via Roma</option>
												<option>Via Ernesto Basile</option>
												<option>Viale Regione</option>
												<option>Via Tersicore</option>
											</Input>
										</Col>
									</Row>
									<Row>
										<Col>

											<center>
												<div className="row ">
													<div className="col">
														<MuiPickersUtilsProvider utils={DateFnsUtils}>
															<Label sm={12} style={{ marginTop: "20px" }}>Ritiro</Label>
															<DateTimePicker format={"dd/MM/yyyy HH:mm"} minDate={new Date()} minTime={new Date()} inputVariant="outlined" value={this.state.dateR} selected={this.state.dateR} onChange={this.handleChangeDataPartenza} />
														</MuiPickersUtilsProvider>
													</div>
												</div>
											</center>

										</Col>
										<Col>

											<center>
												<div className="row ">
													<div className="col">
														<MuiPickersUtilsProvider utils={DateFnsUtils}>
															<Label sm={12} style={{ marginTop: "20px" }}>Consegna</Label>
															<DateTimePicker format={"dd/MM/yyyy HH:mm"} minDate={this.state.dateR} maxDate={moment(this.state.dateR).add(7, 'days')} inputVariant="outlined" value={this.state.dateC} selected={this.state.dateC} onChange={this.handleChangeDataArrivo} />
														</MuiPickersUtilsProvider>
													</div>
												</div>
											</center>

										</Col>
									</Row>

									{/* Pulsante modifica*/}

									<Button type="submit" className="buttonModify" onClick={() => this.modify()} style={{ padding: "8px", margin: "10px", marginTop: "30px" }}  >
										Modifica
									</Button>

									<Button type="submit" className="buttonAnnulla" onClick={() => { this.setting(); this.setModifica("modifica") }} style={{ padding: "8px", margin: "10px", marginTop: "30px" }}  >
										Annulla
									</Button>

								</AvForm>
							</center>}
					</center>
				</div>
			</div>
		);
	}


}
