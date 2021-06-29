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
import NavbarDipendente from "../../../Components/NavbarDipendente"


const data = new Array(10).fill().map((value, index) => ({ id: index, name: "samu", surname: "marino", email: "samuele.marino@gmail.com", telfono: "3205318452", birthday: 26, password: "Giovanni33" }));

export default class PannelloRimuoviCliente extends Component {

	state = {
		list: [],
		name: "",
		surname: "",
		role: "guest",
		modifica: false,
	};

	componentDidMount() {
		if (localStorage.getItem("utente") === null) {
			window.location.href = '/'
		} else {
			let c = JSON.parse(localStorage.getItem("utente"));
			if (c.role === "driver") {
				window.location.href = "/pannelloAutista";
			} else if (c.role === "guest") {
				window.location.href = "/ricerca";
			} else if (c.role === "valet") {
				window.location.href = "/pannelloParcheggiatore";
			}
		}
	}


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
			<div className="ez sfondo" style={{ height: "100%" }}> 
			<NavbarDipendente />
			<div className="row h-100 justify-content-md-center boxpannel">
			<div className="d-flex flex-column pannell-amministratore ">
			<div className="title">Modifica dati utente</div>
						{/*ptipologia veicolo*/}
					
							

								<ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
									<Button color="primary" onClick={() => this.setRSelected("guest")} active={this.state.role === "guest"} >Cliente</Button>
									<Button color="primary" onClick={() => this.setRSelected("driver")} active={this.state.role === "driver"} >Autista</Button>
									<Button color="primary" onClick={() => this.setRSelected("valet")} active={this.state.role === "valet"} >Parcheggiatore</Button>
									<Button color="primary" onClick={() => this.setRSelected("admin")} active={this.state.role === "admin"} >Amministratore</Button>
								</ButtonGroup>
						
					

					
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


								

								<center>
									<Button className="buttonCyano" type="submit" style={{ padding: "8px", marginBottom: "30px"}} >
										cerca
									</Button>
								</center>
							</AvForm>

							
							<div className="d-flex flex-row flex-wrap justify-content-center">
							{this.state.modifica &&
								<div className="p-3 col-12">

									{this.state.list.map(((item) => (
										<CardModificaUtente id={item.id} name={item.name} surname={item.surname} email={item.email} phone={item.phone} birthdate={item.birthdate} />
									)))}
								</div>}
								</div>
					


				</div>
			</div >
			</div>
		);

	}
}