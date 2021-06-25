import React, { Component } from "react";

import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../../ComponentsCss/Pannel.css";
import faker from 'faker';
import CardEliminaCarta from "./CardEliminaCarta";
import Axios from 'axios';



export default class Registrazione extends Component {
	state = {
		listpayments: []
	}

	componentDidMount(){
		Axios.get('/api/guest/listpayments')
		.then((res) => {
			this.setState({ listpayments: res.data });
			console.log(this.state.listpayments);
		}).catch((err) => {
			//window.location.href = '/errorServer';
		});
	}
	
	remove = (cardID) => {
		Axios.delete('/api/guest/deletepayment/' + cardID)
		.then((res) => {
			this.setState({ listpayments: this.state.listpayments.filter(card => card.id !== cardID) });
		}).catch((err) => {
			//window.location.href = '/errorServer';
		});
	};

	render() {
		return (
			<div className="ez">
				<div
					className="row h-100 justify-content-md-center"
					style={{ margin: "5%" }}
				>
					<div className="col-sm-12 col-md-8 col-lg-6 my-auto">
						<Jumbotron style={{ backgroundColor: "#27394c", color: "beige" }} >
							<center>
								<a href="/" style={{ textDecoration: "none" }}>
									<p
										className="glacialReg"
										style={{ fontSize: "40px", color: "white" }}
									>
									Rimuovi Carta
									</p>
								</a>
							</center>

							<br />
							<hr style={{ backgroundColor: "white" }} />

							{<div>
								{this.state.listpayments.map(((item) => (

									<CardEliminaCarta name={item.name} surname={item.surname} number={item.number} id={item.id} remove={this.remove}/>

								)))}
							</div>}

						</Jumbotron>
					</div>
				</div>
			</div >
		);
	}
}