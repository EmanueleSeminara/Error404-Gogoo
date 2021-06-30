import React, { Component } from 'react';
import "bootstrap/dist/js/bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';

import Axios from 'axios';

import {
    Button, ListGroupItem, Label, Col, Input, ListGroup, FormGroup,
} from 'reactstrap';
import {
    AvForm,
    AvField,
} from "availity-reactstrap-validation";

import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';





export default class CardConsegnaFuoriStallo extends Component {
    state = {
        consegna: false,
        mostra: false,
        position: "",
        possibile: true,
        price: 0,
    };

    setting = async () => {
        this.setState({ position: "" })
        this.setState({ mostra: false })
        this.setState({ price: 0 })
        if (this.props.state === "withdrawn") {
            this.setState({ consegna: true })
        } else {
            this.setState({ consegna: false })
        }
        Axios.get('/api/guest/candeliveroutofstall?refVehicle=' + this.props.refVehicle + '&id=' + this.props.id)
            .then((res) => {
                this.setState({ possibile: res.data })
            }).catch((err) => {
                console.log(err)
                if (err.response.status === 422) {
                    this.setState({ string: "errore nell'inserimento dei dati" });
                    this.setState({ error: true });
                } else if (err.response.status === 503) {
                    this.setState({ string: "impossibile cambiare password al momento, riprova più tardi" });
                    this.setState({ error: true });
                } else {
                    window.location.href = "/serverError"
                }
            })
        console.log(this.state.possibile)
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
            <div>
                <div className="card card-css cardStallo">

                    <div className="row no-gutters">
                        <div className="col">
                            <div className="card-body">

                                <div className="row no-gutters">
                                    <div className="col-md-12">
                                        <p className="infoCard"><strong>ID veicolo:  {this.props.refVehicle}</strong></p>
                                        <hr style={{ backgroundColor: "white" }} />
                                    </div>


                                </div>
                                <div className="row no-gutters">
                                    <div className="col-md-6">
                                        <p className="infoCard"><strong>Tipo:</strong> {this.props.type} {this.props.type === "car" ? <> {this.props.category}</> : <></>}</p>
                                        {this.props.refParkingR != null &&
                                            <p className="infoCard"><strong>Parcheggio ritiro:</strong>   {this.props.refParkingR}</p>
                                        }
                                        {this.props.positionR != null &&
                                            <p className="infoCard"><strong>Posizione di ritiro:</strong>   {this.props.positionR}</p>
                                        }
                                        <p className="infoCard"><strong>Data ritiro:</strong>   {this.props.dateR}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p className="infoCard"><strong>Autista:</strong> x{this.props.refDriver}</p>       {/* TODO ########### */}
                                        {this.props.refParkingC != null &&
                                            <p className="infoCard"><strong>Parcheggio consegna:</strong>   {this.props.refParkingC}</p>
                                        }
                                        {this.props.positionC != null &&
                                            <p className="infoCard"><strong>Posizione di consegna:</strong>   {this.props.positionC}</p>
                                        }
                                        <p className="infoCard"><strong>Data consegna:</strong>   {this.props.dateC}</p>
                                    </div>
                                </div>

                                {this.state.possibile &&
                                    <center>
                                        <Button type="button" className="buttonRed" onClick={() => { this.setMostra("mostra"); this.setPrice() }} style={{ marginRight: "10px", marginTop: "20px" }} size="lg" disabled={!this.state.consegna}>
                                            Consegna fuori stallo
                                        </Button>
                                    </center>
                                }
                      
                                {!this.state.possibile &&

                                    <Alert severity="warning">Non puoi effettuare la consegna fuori stallo per questo veicolo</Alert>
                                }
                            </div>
                        </div>
                    </div>
                    {(this.state.mostra) &&
                        <center>


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
                                <h6 className="infoCard">
                                    prezzo per la consegna fuori stallo : {this.state.price}€
                                </h6>




                                {/* Pulsante Conferma*/}

                                <Button type="submit" className="buttonModify" style={{ padding: "8px", margin: "10px" }} >
                                    Conferma
                                </Button>
                                <Button type="submit" className="buttonAnnulla" onClick={() => this.setMostra("mostra")} style={{ padding: "8px", margin: "10px" }} >
                                    Annulla
                                </Button>
                            </AvForm>

                        </center>}

                </div>
            </div>
        );
    }

}
