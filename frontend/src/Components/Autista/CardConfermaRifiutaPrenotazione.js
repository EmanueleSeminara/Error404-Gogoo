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
                            <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p>Id: {this.props.id}</p>
                            </div>
                            <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <p>tipologia: {this.props.type}</p>
                            </div>
                            <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                {this.props.category !== null ? <p>Categoria: {this.props.category}</p> : <> </>}
                            </div>
                            <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ padding: '20px' }}>
                                    <Button outline color="success" onClick={() => this.props.conferma(this.props.id)}>Conferma</Button>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <Button outline color="danger" onClick={() => this.props.rifiuta(this.props.id)}>Rifiuta</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

