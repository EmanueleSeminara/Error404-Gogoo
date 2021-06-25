import React, { Component } from 'react';
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button
} from 'reactstrap';
import PannelloRiepilogoPrenotazione from '../Prenotazione/PannelloRiepilogoPrenotazione'

export default class CardVeicolo extends Component {
	
	setting = () => {
		const reservation = JSON.parse(localStorage.getItem("reservation"))
		reservation.refVehicle = this.props.id
		if (this.props.type === "car"){
			reservation.category = this.props.category
		}
		window.localStorage.setItem("reservation", JSON.stringify(reservation));
		console.log(JSON.parse(localStorage.getItem("reservation")));
		this.setState({conferma: true})
	}

	render() {
		return (
			<div className="card mb-3" style={{ display: "flex", justifyContent: "center" }}>
				<div className="row no-gutters">
					<div className="col-md-12">
						<div className="card-body">
							<h5 className="card-title">Tipo: {this.props.type}</h5>
							{this.props.type === "car" &&
								<p className="card-text">Categoria: {this.props.category}</p>
							}
							<p className="card-index">Id: {this.props.id}</p>
							<a href="/riepilogoPrenotazione" className="btn-lg btn-primary" onClick={() => {this.setting()}} style={{ textDecoration: "none" }}>Prenota</a>
						</div>
					</div>
				</div>
			</div>
		);
	}

}