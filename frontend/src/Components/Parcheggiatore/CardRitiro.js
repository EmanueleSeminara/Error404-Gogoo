import React, { Component } from 'react';
import * as moment from 'moment';
import { Button, ListGroup, Jumbotron, Label, Input, Col, ListGroupItem, Row } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup, } from "availity-reactstrap-validation"

export default class CardRitira extends Component {
    state = {
        ritiro: false,
        disabled: true,
    };

    setting = () => {
        let dateNow = moment(new Date())
        let dateR = moment(this.props.dateR)
        console.log(dateNow + " " + dateR)
        if (dateNow > dateR) {
            console.log("sono dentro")
            this.setState({ ritiro: true })
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
                                <Button type="button" color="primary" onClick={() => this.props.ritira(this.props.id, this.props.refVehicle)} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={!this.state.ritiro}>
                                    Ritiro
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

