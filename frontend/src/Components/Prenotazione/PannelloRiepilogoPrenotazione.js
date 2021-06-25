
import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from '@material-ui/core/Switch';
import Alert from '@material-ui/lab/Alert';
import NavbarCliente from '../NavbarCliente';

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




export default class CardRiepilogoPrenotazione extends Component {
	state = {
		reservation: {}
	}
	componentDidMount() {
		if (localStorage.getItem("reservation") !== null) {
			this.setState({ reservation: JSON.parse(localStorage.getItem("reservation")) });
		} else {
			window.location.href = '/ricerca';
		}
	}
	onValidSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);
	};


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
											{this.state.reservation.refParkingR !== "" &&
												<p><strong>Parcheggio ritiro:</strong>   {this.state.reservation.refParkingR}</p>
											}
											{this.state.reservation.positionR !== "" &&
												<p><strong>Posizione di ritiro:</strong>   {this.state.reservation.positionR}</p>
											}
											<p><strong>Data ritiro:</strong>   {this.state.reservation.dateR}</p>
										</div>
										<div className="col-md-6">
											<p><strong>Autista:</strong> {this.state.reservation.autista}</p>       {/* TODO ########### */}
											{this.state.reservation.refParkingR !== "" &&
												<p><strong>Parcheggio consegna:</strong>   {this.state.reservation.refParkingC}</p>
											}
											{this.state.reservation.positionR !== "" &&
												<p><strong>Posizione di consegna:</strong>   {this.state.reservation.positionC}</p>
											}
											<p><strong>Data consegna:</strong>   {this.state.reservation.dateC}</p>
										</div>

									</div>
									<div className="row no-gutters" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

										<div style={{ padding: "20px" }}>
											<Button type="danger" color="danger" style={{ marginTop: "20px" }} >
												Annulla
											</Button>
										</div>
										<div style={{ padding: "20px" }}>
											<Button type="button" color="success" style={{ marginTop: "20px" }} >
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