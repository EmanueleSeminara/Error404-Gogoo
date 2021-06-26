import React, { Component } from "react";

import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../../ComponentsCss/Pannel.css";
import faker from 'faker';
import CardEliminaCarta from "./CardEliminaCarta";
import Axios from 'axios';
import NavbarCliente from "../../NavbarCliente";



export default class Registrazione extends Component {
	state = {
		listpayments: []
	}

/* 	componentDidMount(){
		Axios.get('/api/guest/listpayments')
		.then((res) => {
			this.setState({ listpayments: res.data });
			console.log(this.state.listpayments);
		}).catch((err) => {
			window.location.href = '/errorServer';
		});
	} */
	
	remove = (cardID) => {
		Axios.delete('/api/guest/deletepayment/' + cardID)
		.then((res) => {
			this.setState({ listpayments: this.state.listpayments.filter(card => card.id !== cardID) });
		}).catch((err) => {
			window.location.href = '/errorServer';
		});
	};

	render() {
		return (
			<div className="ez">
				<NavbarCliente />
				<div
					className="row h-100 justify-content-md-center boxpannel sfondo"
				>
					<div className="col-9 bg-pannell">
						<div >
					
						<center>
									<div
										className="title"
									>
									Rimuovi Carta
									</div>
									</center>
						
				

							
						

							{<div>
								{this.state.listpayments.map(((item) => (

									<CardEliminaCarta name={item.name} surname={item.surname} number={item.number} id={item.id} remove={this.remove}/>

								)))}
							</div>}

						</div>
					</div>
				</div>
			</div >
		);
	}
}