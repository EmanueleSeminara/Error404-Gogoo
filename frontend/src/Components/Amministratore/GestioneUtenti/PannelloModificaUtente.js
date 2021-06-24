import React, { Component } from "react";
import DateFnsUtils from '@date-io/date-fns';
import "../../../ComponentsCss/Pannel.css";


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
import CardModificaUtente from "./CardModificaUtente";
import faker from 'faker';


const data = new Array(10).fill().map((value, index) => ({ id: index, nome: "samu", cognome: "marino", email: "samuele.marino@gmail.com", telfono: "3205318452", birthday: 26, password: "Giovanni33" }));

export default class PannelloRimuoviCliente extends Component {

	state = {
		nome: "",
		cognome: "",
		rSelected: "Cliente",
		modifica: false,
	};

	//funzione DB


	setRSelected = (type) => {
		this.setState({ rSelected: type });
	}

	handleChange = (input) => (e) => {
		this.setState({ [input]: e.target.value });
	};

	setModifica = (bool) => {
		this.setState({ modifica: bool });
	}

	stampa = (state) => {
		console.log(state);
		console.log();
	};

	onValidSubmit = (event) => {
		event.preventDefault();
		console.log(this.state);
		//this.stampa(this.state);
		this.setModifica(true)
	};


	render() {

		return (
			<div className="row h-100 justify-content-md-center"
				style={{ margin: "1%", minHeight: "85vh" }}>
				<div className="col-sm-12 col-md-8 col-lg-6 my-auto">
					<ListGroup>
						{/*ptipologia veicolo*/}
						<center>
							<ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

								<ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
									<Button color="primary" onClick={() => this.setRSelected("Cliente")} active={this.state.rSelected === "Cliente"} size="lg">Cliente</Button>
									<Button color="primary" onClick={() => this.setRSelected("Autista")} active={this.state.rSelected === "Autista"} size="lg">Autista</Button>
									<Button color="primary" onClick={() => this.setRSelected("Parcheggiatore")} active={this.state.rSelected === "Parcheggiatore"} size="lg">Parcheggiatore</Button>
									<Button color="primary" onClick={() => this.setRSelected("Amministratore")} active={this.state.rSelected === "Amministratore"} size="lg">Amministratore</Button>
								</ButtonGroup>
							</ListGroupItem>
						</center>

						<Jumbotron>
							<AvForm onValidSubmit={this.onValidSubmit}>
								{/* Riga nome e cognome */}
								<div className="row">
									<div className="col-12 col-md-6">
										<AvField 
											name="nome"
											type="text"
											label="Nome"
											onChange={this.handleChange("nome")}
											style={{ label: { color: "white" } }}

											validate={{
												required: {
													value: true,
													errorMessage: "Il campo è richiesto",
												},
											}}
										/>
									</div>

									<div className="col-12 col-md-6">
										<AvField
											name="cognome"
											type="text"
											label="Cognome"
											onChange={this.handleChange("cognome")}
											required
											validate={{
												required: {
													value: true,
													errorMessage: "Il campo è richiesto.",
												},
											}}
										/>
									</div>
								</div>


								<br />

							<center>
								<Button color="outline-success" type="submit" /* onClick={() => {this.stampa(this.state); this.setModifica(true)}} */ style={{ padding: "8px" }} size="lg">
									cerca
								</Button>
							</center>
							</AvForm>

							<hr style={{ backgroundColor: "#3FD0CB" }} />
							<br />

							{this.state.modifica && 
							<div>
								{data.map(((item) => (

									<CardModificaUtente nome={item.nome} cognome={item.cognome} email={item.email} telefono={item.telefono} birthday={item.birthday} password={item.password}/>

								)))}
							</div>}
						</Jumbotron>
					</ListGroup>
				</div>
			</div >
		);

	}
}