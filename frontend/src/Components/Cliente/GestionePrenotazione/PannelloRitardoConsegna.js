import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import Axios from "axios";
import CardRitardoConsegna from "./CardRitardoConsegna";
import NavbarCliente from "../../../Components/NavbarCliente";
import { Alert, AlertTitle } from '@material-ui/lab';



export default class PannelloRitiroConsegna extends Component {
    state = {
        listReservation: []
    }


    componentDidMount() {
        if (localStorage.getItem("utente") === null) {
            window.location.href = '/'
        } else {
            let c = JSON.parse(localStorage.getItem("utente"));
            if (c.role === "driver") {
                window.location.href = "/pannelloAutista";
            } else if (c.role === "admin") {
                window.location.href = "/pannelloAmministratore";
            } else if (c.role === "valet") {
                window.location.href = "/pannelloParcheggiatore";
            } else {
                Axios.get('/api/guest/myreservationslatedelivery')
                    .then((res) => {
                        this.setState({ listReservation: res.data })
                        console.log(this.state.listReservation)
                    }).catch((err) => {
                        console.log(err);
                        //window.location.href = '/errorServer'
                    })
            }
        }
    }


    changeDestination = (reservationID, parkingC) => {
        const data = {
            id: reservationID,
            refParkingC: parkingC
        }
        console.log(data)
        Axios.put('/api/guest/changedestinationparking', data)
            .then((res) => {
                this.setState({ listReservation: this.state.listReservation.filter(reservation => reservation.id !== reservationID) });
            }).catch((err) => {
                console.log(err)
                // window.location.href = '/errorServer';
            });
    }


    render() {
        return (
            <div className="ez sfondo-card">
                <NavbarCliente />
                <div className="row justify-content-md-center  ">
                    <div className="d-flex flex-column pannell-User ">
                        <center><div className="title">Ritardo Consegna</div></center>
                        {this.state.listReservation.length == 0 && <Alert severity="info">Non hai prenotazioni in ritardo</Alert>}
                        {this.state.listReservation.map(((item) => (
                            <div className="p-3 col-12">
                                <CardRitardoConsegna id={item.id} type={item.type} category={item.category} dateR={item.dateR} dateC={item.dateC} refParkingR={item.refParkingR} refParkingC={item.refParkingC} refVehicle={item.refVehicle} positionR={item.positionR} state={item.state} changeDestination={this.changeDestination} />
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        );
    }
}

