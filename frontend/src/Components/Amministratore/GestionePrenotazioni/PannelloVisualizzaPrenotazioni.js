import React, { Component } from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, ListGroup, ListGroupItem, Card, Jumbotron, Table, ButtonGroup } from "reactstrap";


import CardPrenotazione from "./CardPrenotazione";
import faker from 'faker';
import Axios from "axios";


export default class PannelloViasualizzaPrenotazioni extends Component {
    state = {
        listReservation: [],
        email: ""
    };


    handleChange = (input) => (e) => {
        this.setState({ [input]: e.target.value });
    };



    onValidSubmit = (event) => {
        console.log("premuto")
        event.preventDefault();
        Axios.get('/api/admin/reservations?email=' + this.state.email )
            .then((res) => {
                this.setState({ listReservation: res.data })
            }).catch((err) => {
                console.log(err);
                //window.location.href = '/errorServer'
            })
    };

    remove = (reservationID) => {
        Axios.delete('/api/admin/deletereservation/' + reservationID)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
            }).catch((err) => {
                window.location.href = '/errorServer';
            });
    };



    render() {
        return (
            <div className="ez sfondo" style={{ height: "100%" }}>
             <div className="row h-100 justify-content-md-center boxpannel">
             <div className="d-flex flex-column pannell-amministratore">
                  
             <div className="title">Visualizza Prenotazioni</div>
                     
                            <AvForm onValidSubmit={this.onValidSubmit}>
                                {/* Riga nome e cognome */}
                                <div className="row">
                                    {/*Riga email */}
                                    <div className="row">
                                        
                                            <AvField
                                                name="email"
                                                label="Email"
                                                type="email"
                                                onChange={this.handleChange("email")}
                                                errorMessage="Campo non valido."
                                                required
                                            />
                                        
                                    </div>
                                    {/* <div className="col-12 col-md-6">
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
                                    </div> */}
                                </div>
                                <br />
                            <center>
                                <Button className="buttonCyano"  type="submit">
                                    cerca
                                </Button>
                            </center>
                            </AvForm>
                    



                        {<div>
                            {this.state.listReservation.map(((item) => (
                                <div className="p-4">
                                <CardPrenotazione id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refDriver={item.refDriver} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} remove={this.remove} />
                                </div>
                            )))}
                        </div>}

                 
                </div>
            </div>
            </div>
        );
    }
}

