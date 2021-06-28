import React, { Component } from 'react';
import { Button, ListGroup, Jumbotron, Label, Input, Col, ListGroupItem, Row } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup, } from "availity-reactstrap-validation"

export default class CardRitiraConfermaRifiutaPrenotazione extends Component {

    conferma = (cardID) => {
        console.log(this.state)
    };

    rifiuta = (cardID) => {
        console.log(this.state)
    }
    render() {
        return (
            <div className="card ">
                <div className="row no-gutters">
                    <div className="col" >
                        <div className="card-body"  >

                            <div className="row no-gutters">
                                <div className="col-md-12">
                                    <p ><strong>ID veicolo:  {this.props.refVehicle}</strong></p>
                                    <hr style={{ backgroundColor: "white" }} />
                                </div>


                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <p><strong>Tipo:</strong> {this.props.type} {this.props.category}</p>
                                    <p><strong>Posizione di ritiro:</strong>   {this.props.positionR}</p>
                                    <p><strong>Data ritiro:</strong>   {this.props.dateR}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Cliente:</strong> {this.props.name} {this.props.surname}</p>
                                    <p><strong>Posizione di consegna:</strong>   {this.props.positionC}</p>
                                    <p><strong>Data consegna:</strong>   {this.props.dateC}</p>
                                </div>
                            </div>
                            
                            
                            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ padding: '20px' }}>
                                    <Button outline color="success" onClick={() => this.props.conferma(this.props.id)}>Conferma</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

