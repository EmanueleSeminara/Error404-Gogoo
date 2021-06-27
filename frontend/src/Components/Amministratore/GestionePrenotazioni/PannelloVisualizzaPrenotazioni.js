import React, { Component } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, ListGroup, ListGroupItem, Card, Jumbotron, Table, ButtonGroup } from "reactstrap";


import CardPrenotazione from "../../Prenotazione/CardPrenotazione";
import faker from 'faker';
import Axios from "axios";


export default class PannelloViasualizzaPrenotazioni extends Component {
    state = {
        listReservation: [],
        nome: "",
        cognome: "",
    };


    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };



    onValidSubmit = (event) => {
        console.log("premuto")
        event.preventDefault();
        Axios.get('/api/')
            .then((res) => {
                this.setState({ listReservation: res.data })
            }).catch((err) => {
                console.log(err);
                //window.location.href = '/errorServer'
            })
    };

    remove = (reservationID) => {
        Axios.delete('/api/reservation/delete/' + reservationID)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    };



    render() {
        return (
            <div className="row h-100 justify-content-md-center">
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto" style={{ margin: "1%", minHeight: "100vh" }}>
                    <ListGroup>
                        <ListGroupItem style={{ backgroundColor: "#2e1534", padding: "10px", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}></ListGroupItem>
                        <Jumbotron style={{ paddingBottom: "0px" }}>
                            <AvForm onValidSubmit={this.onValidSubmit}>
                                {/* Riga nome e cognome */}
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <AvField
                                            name="nome"
                                            type="text"
                                            label="Nome"
                                            onChange={this.handleChange("nome")}
                                            style={{ label: { color: "white" } }}
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Il campo è richiesto",
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <AvField
                                            name="cognome"
                                            type="text"
                                            label="Cognome"
                                            onChange={this.handleChange("cognome")}
                                            required
                                            validate={{
                                                required: {
                                                    value: true,
                                                    errorMessage: "Il campo è richiesto.",
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                                <br />
                            <center>
                                <Button color="outline-success" style={{ padding: "8px" }} type="submit">
                                    cerca
                                </Button>
                            </center>
                            </AvForm>
                        </Jumbotron>



                        {<div>
                            {this.state.listReservation.map(((item) => (
                                <CardPrenotazione id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refDriver={item.refDriver} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} remove={this.remove} />
                            )))}
                        </div>}

                    </ListGroup>
                </div>
            </div>
        );
    }
}

