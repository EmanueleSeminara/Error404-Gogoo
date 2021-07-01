import React, { Component } from "react";
import "../../ComponentsCss/Pannel.css";
import {Button,ButtonGroup} from "reactstrap";
import NavbarCliente from "../NavbarCliente";
import RicercaVeicoli from './RicercaVeicoli';
import RicercaFuoriStallo from './RicercaFuoriStallo';
import RicercaConAutista from './RicercaConAutista';


export default class FormRicerca extends Component {
	state = {
		rSelected: "1",
	};

	componentDidMount() {
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
			}
		}
	}


	setRSelected = (num) => {
		this.setState({ rSelected: num });
	}


	render() {
		return (
			<div className="ez sfondo" style={{ height: "100%" }}>
				<NavbarCliente />
				<div className="row h-100 justify-content-md-center boxpannel">
					<div className="d-flex flex-column pannell-User boxRicerca ">

						<center>
							<ButtonGroup style={{ marginBottom: "20px", flexWrap: "wrap", marginTop: "20px" }}>
								<Button
									className={this.state.rSelected === "1" ? "buttonCyanoGruoupSelected b1" : "buttonCyanoGruoup b1"}
									
									onClick={() => {
										this.setRSelected("1");
										this.setState({ type: "car" });
									}}
									active={this.state.rSelected === "1"}
									size="lg"
								>
									Veicoli nei parcheggi
								</Button>
								<Button
									className={this.state.rSelected === "2" ? "buttonCyanoGruoupSelected b2" : "buttonCyanoGruoup b2"}
									onClick={() => {
										this.setRSelected("2");
										this.setState({ type: "car" });
										this.setState({ refParkingR: "" });
									}}
									active={this.state.rSelected === "2"}
									size="lg"
								>
									Automobili fuori stallo
								</Button>
								<Button
									className={this.state.rSelected === "3" ? "buttonCyanoGruoupSelected b3" : "buttonCyanoGruoup b3"}
									onClick={() => {
										this.setRSelected("3");
										this.setState({ type: "car" });
										this.setState({ refParkingR: "" });
										this.setState({ refParkingC: "" });
									}} active={this.state.rSelected === "3"}
									size="lg"
								>
									Automobile con autista
								</Button>
							</ButtonGroup>
						</center>

						{this.state.rSelected === "1" &&
							<RicercaVeicoli />
						}
						{this.state.rSelected === "2" &&
							<RicercaFuoriStallo />
						}
						{this.state.rSelected === "3" &&
							<RicercaConAutista />
						}

					</div>
				</div>
			</div>
		);
	}
}