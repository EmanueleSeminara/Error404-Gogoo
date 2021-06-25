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
			<div className="row h-100 justify-content-md-center"
				style={{ margin: "1%", minHeight: "85vh" }}>
				<div className="col-sm-12 col-md-8 col-lg-6 my-auto">

					<ListGroup>
						{/*ptipologia veicolo*/}
						<center>
							<ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>

								<ButtonGroup style={{ margin: "10px", flexWrap: "wrap" }}>
									<Button color="primary" onClick={async () => { await this.setRSelected("guest"); this.search()}} active={this.state.role === "guest"}  >Cliente</Button>
									<Button color="primary" onClick={async () => { await this.setRSelected("driver"); this.search() }} active={this.state.role === "driver"}  >Autista</Button>
									<Button color="primary" onClick={async () => { await this.setRSelected("valet"); this.search() }} active={this.state.role === "valet"}  >Parcheggiatore</Button>
									<Button color="primary" onClick={async () => { await this.setRSelected("admin"); this.search() }} active={this.state.role === "admin"} size="lg">Amministratore</Button>
								</ButtonGroup>
							</ListGroupItem>
						</center>

						{<div>
							{this.state.listusers.map(((item) => (

								<CardRimuoviUtente name={item.name} surname={item.surname} email={item.email} id={item.id} remove={this.remove} />

							)))}
						</div>}
					
					</ListGroup>
				</div>
			</div >
		);

	}
}