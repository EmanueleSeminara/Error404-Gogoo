import React, { Component } from "react";
import { ListGroup, ListGroupItem, } from "reactstrap";


import CardPrenotazione from "./CardPrenotazione";
import Axios from 'axios';
import NavbarCliente from "../../../Components/NavbarCliente";
import { Alert, AlertTitle } from '@material-ui/lab';



export default class ViasualizzaMiePrenotazioni extends Component {
    state = {
        listReservation: [],
        modifica: "",
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

    setModifica = (bool) => {
        this.setState({ modifica: bool });
    }

    onValidSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
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
            <div className="ez sfondo-card">
                <NavbarCliente />
                <div className="row justify-content-md-center  ">
                    <div className="d-flex flex-column pannell-User ">
                        <center><div className="title">Visualizza prenotazioni</div></center>
                        {this.state.listReservation.length == 0 && <Alert severity="error">Non hai prenotazioni</Alert>}
                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            {this.state.listReservation.map(((item) => (
                                <div className="p-3 col-12">
                                    <CardPrenotazione id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refDriver={item.refDriver} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} remove={this.remove} />
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
