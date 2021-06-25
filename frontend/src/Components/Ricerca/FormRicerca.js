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

import RicercaVeicoli from './RicercaVeicoli';
import RicercaFuoriStallo from './RicercaFuoriStallo';


export default class FormRicerca extends Component {
	state = {
		rSelected: "1",
	};



	setRSelected = (num) => {
		this.setState({ rSelected: num });
	}


	render() {
		return (
			<div className="row h-100 justify-content-md-center" style={{ margin: "1%", minHeight: "85vh" }}>
				<div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
					<div style={{ backgroundColor: "#27394c", padding: "1vh", paddingTop: "1vh", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
						<center>
							<ButtonGroup style={{ margin: "10px" }}>
								<Button
									color="primary"
									onClick={() => {
										this.setRSelected("1");
										this.setState({ type: "car" });
									}}
									active={this.state.rSelected === "1"}
								>
									Veicoli nei parcheggi
								</Button>
								<Button
									color="primary"
									onClick={() => {
										this.setRSelected("2");
										this.setState({ type: "car" });
										this.setState({ refParkingR: "" });
									}}
									active={this.state.rSelected === "2"}
								>
									Automobili fuori stallo
								</Button>
								<Button
									color="primary"
									onClick={() => {
										this.setRSelected("3");
										this.setState({ type: "car" });
										this.setState({ refParkingR: "" });
										this.setState({ refParkingC: "" });
									}} active={this.state.rSelected === "3"}
								>
									Automobile con autista
								</Button>
							</ButtonGroup>
						</center>
					</div>
					{this.state.rSelected === "1" &&
						<RicercaVeicoli/>
					}
					{this.state.rSelected === "2" &&
						<RicercaFuoriStallo/>
					}

				</div>
			</div>
		);
	}
}