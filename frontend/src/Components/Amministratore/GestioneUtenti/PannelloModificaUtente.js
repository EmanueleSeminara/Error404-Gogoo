import React, { Component } from "react";
import "../../../ComponentsCss/Pannel.css";
import { Button, ButtonGroup } from "reactstrap";
import { AvForm, AvField, } from "availity-reactstrap-validation";
import CardModificaUtente from "./CardModificaUtente";
import Axios from 'axios';
import NavbarDipendente from "../../../Components/NavbarDipendente"
import { Alert } from '@material-ui/lab';

export default class PannelloModificaUtente extends Component {

	state = {
		list: [],
		name: "",
		surname: "",
		role: "guest",
		error: false,
		string: ""
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

	
	onValidSubmit = async (event) => {
		event.preventDefault();
		Axios.get('/api/admin/listusers?role=' + this.state.role + '&name=' + this.state.name + '&surname=' + this.state.surname)
			.then((res) => {
				this.setState({ list: res.data });
				this.setState({ error: false })
				if (res.data.length === 0) {
					this.setState({ string: "Non ci sono utenti con queste credenziali" });
					this.setState({ error: true })
				}
			}).catch((err) => {
				if (err.response.status === 422) {
					this.setState({ string: "errore nell'inserimento dei dati" });
					this.setState({ error: true });
				}else if (err.response.status === 503) {
					this.setState({ string: "Per il momento non è possibile cercare gli utenti, riprova più tardi" });
					this.setState({ error: true });
				} else{
					window.location.href = "/errorServer";
				}
			})
		
	};



	render() {

		return (
			<div className="ez sfondo" style={{ height: "100%" }}>
				<NavbarDipendente />
				<div className="row h-100 justify-content-md-center boxpannel">

					<div className="d-flex flex-column pannell-amministratore ">
						<div className="title">Modifica dati utente</div>
						{/*ptipologia veicolo*/}
						<div className="col-9">

							<center>

								<ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
									<Button className={this.state.role === "guest" ? "buttonCyanoGruoupSelected" : "buttonCyanoGruoup"} onClick={() => this.setRSelected("guest")} active={this.state.role === "guest"} >Cliente</Button>
									<Button className={this.state.role === "driver" ? "buttonCyanoGruoupSelected" : "buttonCyanoGruoup"} onClick={() => this.setRSelected("driver")} active={this.state.role === "driver"} >Autista</Button>
									<Button className={this.state.role === "valet" ? "buttonCyanoGruoupSelected" : "buttonCyanoGruoup"} onClick={() => this.setRSelected("valet")} active={this.state.role === "valet"} >Parcheggiatore</Button>
									<Button className={this.state.role === "admin" ? "buttonCyanoGruoupSelected" : "buttonCyanoGruoup"} onClick={() => this.setRSelected("admin")} active={this.state.role === "admin"} >Amministratore</Button>
								</ButtonGroup>

							</center>




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
									<Button className="buttonCyano" type="submit" style={{ padding: "8px", marginBottom: "30px" }} >
										cerca
									</Button>
								</center>
							</AvForm>

							{this.state.error && <Alert severity="error">{this.state.string}</Alert>}


							<div className="d-flex flex-row flex-wrap justify-content-center">
									<div className="p-3 col-12">

										{this.state.list.map(((item) => (
											<CardModificaUtente id={item.id} name={item.name} surname={item.surname} email={item.email} phone={item.phone} birthdate={item.birthdate} />
										)))}
									</div>
							</div>



						</div>
					</div>
				</div >
			</div>
		);

	}
}