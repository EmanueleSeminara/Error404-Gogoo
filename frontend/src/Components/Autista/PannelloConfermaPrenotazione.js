import React, { Component } from "react";

import { Jumbotron, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import "../../ComponentsCss/Pannel.css";
import faker from 'faker';
import CardConfermaRifiutaPrenotazione from "./CardConfermaPrenotazione";
import Axios from 'axios';


export default class PannelloConfermaRifiutaPrenotazione extends Component {
    state = {
        listReservationDriver: []
    }

    componentDidMount() {
        if (localStorage.getItem("utente") === null) {
            window.location.href = '/'
        } else {
            let c = JSON.parse(localStorage.getItem("utente"));
            if (c.role === "admin") {
                window.location.href = "/pannelloAmministratore";
            } else if (c.role === "guest") {
                window.location.href = "/ricerca";
            } else if (c.role === "valet") {
                window.location.href = "/pannelloParcheggiatore";
            } else {
                Axios.get('/api/driver/reservationsnotconfirmed')
                    .then((res) => {
                        console.log(res.data)
                        this.setState({ listReservationDriver: res.data });
                    }).catch((err) => {
                        console.log(err)
                        //window.location.href = '/errorServer';
                     
                    });
            }
        }
    }


    conferma = (reservationID) => {
        Axios.put('/api/driver/confirmationofreservation/?id=' + reservationID)
            .then((res) => {
                this.setState({ listReservationDriver: this.state.listReservationDriver.filter(reservation => reservation.id !== reservationID) });
                // MESSAGGIO DI SUCESSO +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            }).catch((err) => {
                console.log(err)
                //window.location.href = '/errorServer';
            });
    }

    render() {
        return (
            <div className="row h-100 justify-content-md-center" style={{ margin: "1%", minHeight: "45vh" }}>
                <div className="col-sm-12 col-md-8 col-lg-6 my-auto ">
                   
                   
               
                        {/* {this.state.listReservationDriver.map(((item) => (
                            <div className="p-3">
                            <CardConfermaRifiutaPrenotazione type={item.type} category={item.category} id={item.id} dateR={item.dateR} dateC={item.dateC} refVehicle={item.refVehicle} positionC={item.positionC} positionR={item.positionR} state={item.state} name={item.name} surname={item.surname} conferma={this.conferma} />
                            </div>
                        )))} */}
                   
                </div>
            </div>
        );
    }
}