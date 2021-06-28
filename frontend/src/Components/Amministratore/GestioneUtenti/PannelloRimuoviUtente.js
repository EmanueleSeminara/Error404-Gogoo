import React, { Component } from "react";
import "../../../ComponentsCss/Pannel.css";
import { ListGroup, ListGroupItem, Button, ButtonGroup,} from "reactstrap";
import faker from 'faker';
import CardRimuoviUtente from "./CardRimuoviUtente";
import Axios from 'axios';



export default class PannelloRimuoviUtente extends Component {

	state = {
		listusers:[],
		role: "guest",
	};

	componentDidMount() {
		Axios.get('api/admin/listusers/guest')
			.then((res) => {
				this.setState({ listusers: res.data });
			}).catch((err) => {
				window.location.href = '/errorServer';
			});
	}

	search = () => {
		console.log("SONO DENTRO SEARCH")
		console.log(this.state.role);
		Axios.get('api/admin/listusers/' + this.state.role)
		.then((res) => {
			this.setState({ listusers: res.data });
			console.log(this.state.listusers);
		}).catch((err) => {
			window.location.href='/errorServer';
		});
	}


	setRSelected = (type) => {
		this.setState({ role: type });
	}

	remove = (userID) => {
		Axios.delete('/api/admin/delete/' + userID)
			.then((res) => {
				this.setState({ listusers: this.state.listusers.filter(user => user.id !== userID) });
			}).catch((err) => {
				window.location.href = '/errorServer';
			});
	};


	render() {

		return (
			<div className="ez sfondo" style={{ height: "100%" }}>
			<div className="row h-100 justify-content-md-center boxpannel">
			<div className="d-flex flex-column pannell-amministratore">
			<div className="title">Rimuovi utente</div>

			
						{/*ptipologia veicolo*/}
					

								<ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
									<Button className="buttonCyanoGruoup " onClick={async () => { await this.setRSelected("guest"); this.search()}} active={this.state.role === "guest"}  >Cliente</Button>
									<Button className="buttonCyanoGruoup " onClick={async () => { await this.setRSelected("driver"); this.search() }} active={this.state.role === "driver"}  >Autista</Button>
									<Button className="buttonCyanoGruoup " onClick={async () => { await this.setRSelected("valet"); this.search() }} active={this.state.role === "valet"}  >Parcheggiatore</Button>
									<Button className="buttonCyanoGruoup " onClick={async () => { await this.setRSelected("admin"); this.search() }} active={this.state.role === "admin"} >Amministratore</Button>
								</ButtonGroup>
						


								<div class="d-flex flex-column">
							{this.state.listusers.map(((item) => (
									 <div className="p-3 carta">
								<CardRimuoviUtente name={item.name} surname={item.surname} email={item.email} id={item.id} remove={this.remove} />
								</div>

							)))}
							 </div>
				
					
				
				</div>
			</div >
			</div>
		);

	}
}