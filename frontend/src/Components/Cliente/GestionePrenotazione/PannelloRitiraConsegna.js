import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

import Axios from 'axios';
import CardRitiroConsegna from "./CardRitiroConsegna";
import { Alert, AlertTitle } from '@material-ui/lab';
import NavbarCliente from "../../../Components/NavbarCliente";
import "../../../ComponentsCss/GestionePrenotazione.css"



export default class PannelloRitiroConsegna extends Component {
    state = {
        listReservation: [],
    };

    componentDidMount() {
        Axios.get('/api/reservation/myreservations')
            .then((res) => {
                this.setState({ listReservation: res.data })
                console.log(this.state.listReservation)
            }).catch((err) => {
                console.log(err);
                //window.location.href = '/errorServer'
            })
    }

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
            <div className="ez sfondo-card">
                <NavbarCliente />
                <div className="row justify-content-md-center  ">
                <div className="d-flex flex-column pannell-User ">
                    <center><div className="title">Ritiro e Consegna</div></center>
                    {this.state.listReservation.length == 0 && <Alert severity="error">Non hai prenotazioni</Alert>}
                    <div className="d-flex flex-row flex-wrap justify-content-center">

                        {this.state.listReservation.map(((item) => (
                            <div className="p-3 col-12">
                                <CardRitiroConsegna id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refDriver={item.refDriver} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} state={item.state} remove={this.remove} />
                            </div>
                        )))}
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}

