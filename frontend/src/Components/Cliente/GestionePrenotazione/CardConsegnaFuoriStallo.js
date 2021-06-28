import React, { Component } from 'react';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from '@material-ui/lab/Alert';
import Axios from 'axios';

import {
    Button, ListGroupItem, Label, Col, Input, ListGroup, FormGroup,
} from 'reactstrap';

import {
    AvForm,
    AvField,
} from "availity-reactstrap-validation";





export default class CardConsegnaFuoriStallo extends Component {
    state = {
        consegna: false,
        mostra: false,
        position: "",
        possibile: true,
        price: 0,
    };

    setting = () => {
        // verificare che il velico prenotato non abbia altre prenotazioni refVehicle id
        if (this.state.possibile) {
            this.setState({ position: "" })
            this.setState({ mostra: false })
            this.setState({ price: 0 })
            if (this.props.state === "withdrawn") {
                this.setState({ consegna: true })
            }
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

    setMostra = (input) => {
        this.setState({ mostra: !this.state[input] });
    }


    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    }

    setPrice = () => {
        if (this.props.category === "suv") {
            this.setState({ price: 17 })
        } else if (this.props.category === "berline") {
            this.setState({ price: 20 })
        } else {
            this.setState({ price: 15 });
        }
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        window.localStorage.setItem("price", this.state.price);
        this.props.remove(this.props.id, this.props.refVehicle, this.state.position);
    };



    render() {
        return (
            <div className="card mb-3" style={{ maxWidth: " 940px", padding: "10px" }}>

                <div className="row no-gutters">
                    <div className="col-md-12">
                        <div className="card-body">

                            <div className="row no-gutters">
                                <div className="col-md-12">
                                    <p ><strong>ID veicolo:  {this.props.refVehicle}</strong></p>
                                    <hr style={{ backgroundColor: "white" }} />
                                </div>


                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <p><strong>Tipo:</strong> {this.props.type} {this.props.type === "car" ? <> {this.props.category}</> : <></>}</p>
                                    {this.props.refParkingR != null &&
                                        <p><strong>Parcheggio ritiro:</strong>   {this.props.refParkingR}</p>
                                    }
                                    {this.props.positionR != null &&
                                        <p><strong>Posizione di ritiro:</strong>   {this.props.positionR}</p>
                                    }
                                    <p><strong>Data ritiro:</strong>   {this.props.dateR}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Autista:</strong> x{this.props.refDriver}</p>       {/* TODO ########### */}
                                    {this.props.refParkingC != null &&
                                        <p><strong>Parcheggio consegna:</strong>   {this.props.refParkingC}</p>
                                    }
                                    {this.props.positionC != null &&
                                        <p><strong>Posizione di consegna:</strong>   {this.props.positionC}</p>
                                    }
                                    <p><strong>Data consegna:</strong>   {this.props.dateC}</p>
                                </div>
                            </div>

                            {this.state.possibile &&
                                <center>
                                    <Button type="button" color="primary" onClick={() => { this.setMostra("mostra"); this.setPrice() }} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={!this.state.consegna}>
                                        Consegna fuori stallo
                                    </Button>
                                </center>
                            }
                            {!this.state.possibile &&
                                <h3>non puoi effettuare la consegna fuori stallo per questo veicolo</h3>
                            }
                        </div>
                    </div>
                </div>
                {(this.state.mostra) &&
                    <center>
                        <ListGroup>
                            <ListGroupItem >
                                <AvForm onValidSubmit={this.onValidSubmit}>
                                    <center>
                                        <div className="row">
                                            <div className="col-12 col-md-12">
                                                <AvField
                                                    name="id"
                                                    type="text"
                                                    label="Via di riferimento"
                                                    placeholder={this.state.position}
                                                    onChange={this.handleChange("position")}
                                                    style={{ label: { color: "white" } }}
                                                    validate={{
                                                        required: {
                                                            value: true,
                                                            errorMessage: "Il campo è richiesto.",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </center>
                                    <Label for="exampleText">Motivo della consegna fuori stallo (opzionale)</Label>
                                    <FormGroup row>
                                        <Col >
                                            <Input type="textarea" name="text" id="exampleText" />
                                        </Col>
                                    </FormGroup>

                                    {/* scrivile meglio mimmo*/}
                                    <h6>
                                        prezzo per la consegna fuori stallo : {this.state.price}€
                                    </h6>


                                    {/* Pulsante Conferma*/}

                                    <Button type="submit" color="primary" style={{ padding: "8px", margin: "10px" }} size="lg">
                                        Conferma
                                    </Button>
                                    <Button type="submit" color="error" onClick={() => this.setMostra("mostra")} style={{ padding: "8px", margin: "10px" }} size="lg">
                                        Annulla
                                    </Button>
                                </AvForm>
                            </ListGroupItem>
                        </ListGroup>
                    </center>}

            </div>
        );
    }

}
