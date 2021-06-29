
import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from '@material-ui/core/Switch';
import Alert from '@material-ui/lab/Alert';
import NavbarCliente from '../NavbarCliente';
import Axios from 'axios'
import * as moment from 'moment';

import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button, ListGroupItem, Label, Col, Input, ListGroup, Row, FormGroup, CustomInput, Jumbotron,
} from 'reactstrap';

import {
	AvForm,
	AvGroup,
	AvRadio,
	AvRadioGroup,
	AvField,
} from "availity-reactstrap-validation";

import {
	DatePicker,
	TimePicker,
	DateTimePicker,
	MuiPickersUtilsProvider,
} from '@material-ui/pickers';




export default class PannelloRiepilogoPrenotazione extends Component {
	state = {
		reservation: {},
		price: 0,
		tip: 0
	}

	async componentDidMount() {
		if (localStorage.getItem("utente") === null) {
			window.location.href = '/'
		} else {
			let c = JSON.parse(localStorage.getItem("utente"));
			if (c.role === "driver") {
				window.location.href = "/pannelloAutista";
			} else if (c.role === "valet") {
				window.location.href = "/pannelloParcheggiatore";
			} else if (c.role === "admin") {
				window.location.href = "/pannelloAmministratore";
			} else {
				if (localStorage.getItem("reservation") !== null) {
					await this.setState({ reservation: JSON.parse(localStorage.getItem("reservation")) });
					this.setPrice()
				} else {
					window.location.href = '/ricerca';
				}
			}
		}
	}


	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	cancel = () => {
		localStorage.removeItem("reservatiom");
		window.location.href = '/ricerca'
	}

	confirmation = () => {
		Axios.post('/api/reservation/add', this.state.reservation)
			.then( (res) => {
				let price = Number(this.state.price) + Number(this.state.tip);
				 window.localStorage.setItem("price", price);
				window.location.href = '/pagamento'
			})
			.catch((err) => {
				console.log(err);
			})
	}

	setPrice = () => {
		console.log(this.state.reservation)
		let dateC = moment(this.state.reservation.dateC)
		let dateR = moment(this.state.reservation.dateR)
		let price = ((dateC - dateR) / 1000000);
		if (this.state.reservation.type === "car") {
			if (this.state.reservation.category === "suv") {
				price *= 1.8;
			} else if (this.state.reservation.category === "berline") {
				price *= 1.9;
			} else {
				price *= 1.7;
			}
		} else if (this.state.reservation.type === "scooter") {
			price *= 1.4
		} else if (this.state.reservation.type === "bicycle") {
			price *= 0.9;
		} else {
			price *= 1.1;
		}
		console.log(price);
		this.setState({ price: price })
	}


	render() {
		return (
			<div style={{ backgroundColor: "#050a19", height: "100vh" }}>
				<NavbarCliente />
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<div className="card mb-1" style={{ width: "38rem", padding: "10px", marginTop: "10vh", borderRadius: "20px" }}>

						<div className="row-mb-12 ">
							<div className="col-md-12">
								<div className="card-body">

									<div className="row no-gutters">
										<div className="col-md-12">

											<center><h5 style={{ marginBottom: "50px" }}>Riepilogo prenotazione</h5></center>
											<p ><strong>ID veicolo:  {this.state.reservation.refVehicle}</strong></p>
											<hr style={{ backgroundColor: "white" }} />
										</div>


									</div>
									<div className="row no-gutters">
										<div className="col-md-6">
											<p><strong>Tipo:</strong> {this.state.reservation.type} {this.state.reservation.type === "car" ? <> {this.state.reservation.category}</> : <></>}</p>
											{this.state.reservation.refParkingR != null &&
												<p><strong>Parcheggio ritiro:</strong>   {this.state.reservation.refParkingR}</p>
											}
											{this.state.reservation.positionR != null &&
												<p><strong>Posizione di ritiro:</strong>   {this.state.reservation.positionR}</p>
											}
											<p><strong>Data ritiro:</strong>   {this.state.reservation.dateR}</p>
										</div>
										<div className="col-md-6">
											<p><strong>Autista:</strong> {this.state.reservation.refDriver}</p>       {/* TODO ########### */}
											{this.state.reservation.refParkingC != null &&
												<p><strong>Parcheggio consegna:</strong>   {this.state.reservation.refParkingC}</p>
											}
											{this.state.reservation.positionC != null &&
												<p><strong>Posizione di consegna:</strong>   {this.state.reservation.positionC}</p>
											}
											<p><strong>Data consegna:</strong>   {this.state.reservation.dateC}</p>
										</div>
										<p><strong>price:</strong>   {this.state.price}</p>
									</div>

									<div>
										{
											this.state.reservation.refDriver != null &&
											<AvForm>

												<AvField
													name="nome"
													type="number"
													label="Inserire una mancia per l'autista (opzionale)"
													onChange={this.handleChange("tip")} 
													style={{ label: { color: "white" } }}
													min={0}
												/>
											</AvForm>
										}
									</div>

									<div className="row no-gutters" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

										<div style={{ padding: "20px" }}>
											<Button type="danger" color="danger" onClick={() => { this.cancel() }} style={{ marginTop: "20px" }} >
												Annulla
											</Button>
										</div>
										<div style={{ padding: "20px" }}>
											<Button type="button" color="success" onClick={() => { this.confirmation() }} style={{ marginTop: "20px" }} >
												Continua
											</Button>
										</div>


									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

}