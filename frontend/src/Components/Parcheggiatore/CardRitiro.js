import React, { Component } from 'react';
import { Button, ListGroup, Jumbotron, Label, Input, Col, ListGroupItem, Row } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup, } from "availity-reactstrap-validation"

export default class CardRitira extends Component {


    render() {
        return (
            <div className="card ">
                <div className="row no-gutters">
                    <div className="col" >
                        <div className="card-body"  >

                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <p><strong>Tipo:</strong> {this.props.type} {this.props.type === "car" ? <> {this.props.category}</> : <></>}</p>
                                    <p><strong>Parcheggio ritiro:</strong>   {this.props.refParkingR}</p>
                                    <p><strong>Data ritiro:</strong>   {this.props.dateR}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Cliente:</strong>   {this.props.name} {this.props.surname}</p>
                                    <p><strong>Parcheggio consegna:</strong>   {this.props.refParkingC}</p>
                                    <p><strong>Data consegna:</strong>   {this.props.dateC}</p>
                                </div>
                            </div>

                            <div className="row" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Button color="primary" onClick={() => this.props.ritira(this.props.id)}>Ritira</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

