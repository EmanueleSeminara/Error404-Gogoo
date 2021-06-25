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
import Axios from 'axios';


const data = new Array(10).fill().map((value, index) => ({ id: index, name: "samu", surname: "marino", email: "samuele.marino@gmail.com", telfono: "3205318452", birthday: 26, password: "Giovanni33" }));

export default class PannelloRimuoviCliente extends Component {

	state = {
		list: [],
		name: "",
		surname: "",
		role: "guest",
		modifica: false,
	};


	setRSelected = (type) => {
		this.setState({ role: type });
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

	search = () => {
		Axios.get('/api/admin/listusers?role=' + this.state.role + '&name=' + this.state.name + '&surname=' + this.state.surname)
			.then((res) => {
				this.setState({ list: res.data });
			}).catch((err) => {
				console.log(err);
			})
	}

	onValidSubmit = async (event) => {
		event.preventDefault();
		await this.search();
		console.log(this.state.list);
		this.setModifica(true);
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
									<Button color="primary" onClick={() => this.setRSelected("guest")} active={this.state.role === "guest"} >Cliente</Button>
									<Button color="primary" onClick={() => this.setRSelected("driver")} active={this.state.role === "driver"} >Autista</Button>
									<Button color="primary" onClick={() => this.setRSelected("valet")} active={this.state.role === "valet"} >Parcheggiatore</Button>
									<Button color="primary" onClick={() => this.setRSelected("admin")} active={this.state.role === "admin"} >Amministratore</Button>
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
											onChange={this.handleChange("name")}
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
											onChange={this.handleChange("surname")}
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
									<Button color="outline-success" type="submit" style={{ padding: "8px" }} >
										cerca
									</Button>
								</center>
							</AvForm>

							<hr style={{ backgroundColor: "#3FD0CB" }} />
							<br />
							{this.state.modifica &&
								<div>

									{this.state.list.map(((item) => (
										<CardModificaUtente id={item.id} name={item.name} surname={item.surname} email={item.email} phone={item.phone} birthdate={item.birthdate} />
									)))}
								</div>}
						</Jumbotron>
					</ListGroup>


				</div>
			</div >
		);

	}
}