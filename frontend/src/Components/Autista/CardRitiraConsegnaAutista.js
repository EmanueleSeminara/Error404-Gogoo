import React, { Component } from 'react';
import { Button, ListGroup, Jumbotron, Label, Input, Col, ListGroupItem, Row } from 'reactstrap';
import { AvForm, AvField, AvRadio, AvRadioGroup, } from "availity-reactstrap-validation"
import * as moment from 'moment';
import Axios from 'axios';


export default class CardRitiraConsegnaAutista extends Component {

    state = {
        ritiro: false,
        consegna: false,
        disabled: true,
    };

    setting = () => {
        if (this.props.state === "withdrawn") {
            this.setState({ ritiro: false })
            this.setState({ consegna: true })
        } else {
            let dateNow = moment(new Date())
            let dateR = moment(this.props.dateR)
            console.log(dateNow + " " + dateR)
            if (dateNow > dateR) {
                console.log("sono dentro")
                this.setState({ ritiro: true })
                this.setState({ consegna: false })
            }
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

    ritira = () => {
        const data = {
            id: this.props.id,
            refVehicle: this.props.refVehicle
        }
        Axios.put('/api/driver/retirecar/', data)
            .then((res) => {
                this.setState({ ritiro: false })
                this.setState({ consegna: true })
            }).catch((err) => {
                console.log(err)
            })

    }

    consegna = () => {
        this.props.consegna();
        //MOSTRARE MESSAGGIO DI SUCCESSO DELLA CONSEGNA +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
                                    <p><strong>Cliente:</strong> {this.props.refGuest}</p>
                                    <p><strong>Posizione di consegna:</strong>   {this.props.positionC}</p>
                                    <p><strong>Data consegna:</strong>   {this.props.dateC}</p>
                                </div>
                            </div>

                            <center>
                                <Button type="button" color="primary" onClick={() => this.ritira()} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={!this.state.ritiro}>
                                    Ritiro
                                </Button>
                                <Button type="button" color="success" onClick={() => this.consegna(this.props.id, this.props.refVehicle)} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={!this.state.consegna}>
                                    Consegna
                                </Button>
                            </center>

                            {/* <div className="row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ padding: '20px' }}>
                                    <Button outline color="primary" onClick={() => this.ritira()}>Ritira</Button>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    <Button outline color="primary" onClick={() => this.consegna()}>Consegna</Button>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

