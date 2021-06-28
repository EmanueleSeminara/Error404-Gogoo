import React, { Component } from 'react';
import { Button, ListGroup, Jumbotron, Label, Input, Col, ListGroupItem, Row } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup, } from "availity-reactstrap-validation"

export default class CardConsegna extends Component {
    state = {
        consegna: false,
        disabled: true,
    };

    setting = () => {
        if (this.props.state === "withdrawn") {
            this.setState({ consegna: true })
        } else {
            this.setState({ consegna: false })
        }

    }

    componentDidMount() {
        this.setting();
    }

    componentDidUpdate(propsPrecedenti) {
        if (this.props !== propsPrecedenti) {
            this.setting();
        }
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

                            <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button type="button" color="success" onClick={() => this.props.remove(this.props.id)} disabled={!this.state.consegna}>
                                    Consegna
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

