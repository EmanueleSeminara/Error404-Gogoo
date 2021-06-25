import React, { Component } from 'react';
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, CardSubtitle, Button
} from 'reactstrap';

export default class CardVeicolo extends Component {
	
	render() {
		return (
			<div className="card mb-3" style={{ maxWidth: " 540px" }}>
				<div className="row no-gutters">
					<div className="col-md-12">
						<div className="card-body">
							<h5 className="card-title">Tipo: {this.props.type}</h5>
							{this.props.type === "car" &&
								<p className="card-text">Categoria: {this.props.category}</p>
							}
							<p className="card-index">Id: {this.props.id}</p>
							{this.props.rSelected === "2" &&
								<p className="card-index">parcheggio di ritiro: {this.props.positionR}</p>
							}
							<a href="#" className="btn-lg btn-primary" style={{ textDecoration: "none" }}>Prenota</a>
						</div>
					</div>
				</div>
			</div>
		);
	}

}